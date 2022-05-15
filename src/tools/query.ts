import { Maybe } from "__generated__/schema.generated";
import { Filter } from "mongodb";

type Type = "string" | "number" | "boolean";

interface ISearchField<T> {
  field: keyof T;
  type: Type;
}

interface ICreateQueryParserOptions<T> {
  searchTermFields?: Array<keyof T>;
  searchFields: Array<ISearchField<T>>;
}

const parseValue = (value: string, type: Type) => {
  switch (type) {
    case "string":
      return value;
    case "number":
      return Number(value);
    case "boolean":
      if (value !== "true" && value !== "false") {
        throw new Error("TODO: Sorry mate, this can't be parsed as a boolean");
      }
      return value === "true";
  }
};

// TODO: Move to a better place
type Comparator = ":" | ":>" | ":>=" | ":<" | ":<=";

// TODO: Naming is shit here
export const createParseFilterFn = <T>(
  searchFields: Array<ISearchField<T>>
) => (condition: string): Filter<T> => {
  const match = condition.match(/^(\w*)(-?)(:|:>|:<|:>=|:<=)?(\w*|\*)$/i);
  if (!match) {
    throw new Error("TODO: Faulty condition provided");
  }

  const [_, fieldName, not, comparator, value] = match;

  // TODO: Error handling
  // TODO: - Throw an error when the $exists special case is used outside of : or -:
  if (comparator !== ":" && value === "*") {
    throw new Error("TODO: comperator is not usable with");
  }

  let operator: "$eq" | "$gt" | "$gte" | "$lt" | "$lte";

  switch (comparator as Comparator) {
    case ":":
      operator = "$eq";
      break;
    case ":>":
      operator = "$gt";
      break;
    case ":>=":
      operator = "$gte";
      break;
    case ":<":
      operator = "$lt";
      break;
    case ":<=":
      operator = "$lte";
      break;
  }

  const searchFieldConfig = searchFields.find(
    (config) => config.field === fieldName
  );

  if (!searchFieldConfig) {
    throw new Error(`Querying ${fieldName} is not available`);
  }

  // TODO: Description for special case $exists
  if (value === "*") {
    return {
      // tslint:disable-line no-object-literal-type-assertion
      [searchFieldConfig.field as keyof T]: {
        $exists: true,
      },
    } as Filter<T>;
  }

  // TODO: Naming???
  const operation = {
    [operator]: parseValue(value, searchFieldConfig.type),
  };

  // TODO: Describe not functionality
  return (not === "-"
    ? {
        [searchFieldConfig.field]: { $not: operation },
      }
    : {
        [searchFieldConfig.field]: operation,
      }) as Filter<T>;
};

type Connective = "AND" | "OR";

// const parseRootDirective;

interface IParsedConnective {
  connective: Connective;
  filters: Array<IParsedConnective | string>;
}

interface IMarker {
  marker: string;
  value: string;
}

const placeMarkers = (
  str: string,
  markers: IMarker[] = []
): { markers: IMarker[]; str: string } => {
  const match = str.match(/\([^\(\)]*\)/g);

  if (!match) {
    return {
      markers,
      str,
    };
  }

  match?.forEach((matchedString) => {
    const nextMarkerIndex = markers.length;
    const marker = `<marker${nextMarkerIndex}>`;
    markers.push({ marker, value: matchedString });
    str = str.replace(matchedString, `<marker${nextMarkerIndex}>`);
  });

  // Recursive marker placement
  const { str: _str } = placeMarkers(str, markers);

  return {
    markers,
    str: _str,
  };
};

const getConnectiveFromString = (str: string): Connective => {
  const match = str.match(/ OR | AND /gi);
  if (!match) {
    return "AND";
  }

  const connective: Connective | null =
    match?.every((a) => a === " AND ") || match?.length === 0
      ? "AND"
      : match?.every((a) => a === " OR ")
      ? "OR"
      : null;

  if (!connective) {
    throw new Error("TODO: Mix of AND and OR on same level");
  }
  return connective;
};

const parseConnectivesWithMarkers = (
  str: string,
  markers: IMarker[]
): IParsedConnective => {
  const connective = getConnectiveFromString(str);

  // Removes trailing parentheses
  if (str[0] === "(" && str[str.length - 1] === ")") {
    str = str.substr(1, str.length - 2);
  }

  const splitStr = str.split(` ${connective} `);

  return {
    connective,
    filters: splitStr.map((habibi) => {
      const isMarker = habibi.match(/^<marker\d>$/);
      if (isMarker) {
        const markerValue = markers.find(
          (marker) => marker.marker === isMarker[0]
        );
        if (!markerValue) {
          throw new Error("TODO; Marker not found");
        }

        return parseConnectivesWithMarkers(markerValue?.value, markers);
      }
      return habibi;
    }),
  };
};

const parseConnectives = (value: string): IParsedConnective => {
  const { str: rootString, markers } = placeMarkers(value);

  return parseConnectivesWithMarkers(rootString, markers);
};

const mongoDBConnectiveMap = {
  OR: "$or",
  AND: "$and",
} as const;

export const createParseQueryFn = <T>({
  searchTermFields,
  searchFields,
}: ICreateQueryParserOptions<T>) => {
  const parseFitler = createParseFilterFn<T>(searchFields);

  const parseMongoDBConnectives = (
    connectiveConfig: IParsedConnective
  ): Filter<T> => {
    const filters = connectiveConfig.filters.map((filter) => {
      if (typeof filter === "string") {
        return parseFitler(filter);
      } else {
        return parseMongoDBConnectives(filter);
      }
    });

    if (filters.length === 1) {
      return filters[0];
    }
    return {
      // tslint:disable-line no-object-literal-type-assertion
      [mongoDBConnectiveMap[connectiveConfig.connective]]: filters,
    } as Filter<T>;
  };

  return (query: Maybe<string> | undefined): Filter<T> => {
    if (!query) return {};

    const connectiveRoot = parseConnectives(query);
    return parseMongoDBConnectives(connectiveRoot);
  };
};
