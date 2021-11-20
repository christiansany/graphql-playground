import { Maybe } from "@generation/generated";
import { Filter } from "mongodb";

type Type = "string" | "number" | "boolean";

interface ISearchField<T> {
  field: keyof T;
  type: Type;
}

interface ICreateQueryParserOptions<T> {
  searchTermFields: Array<keyof T>;
  searchFields: Array<ISearchField<T>>;
}

// enum Actions {
//   EQUALS = "EQUALS",
//   LESS_THAN = "LESS_THAN",
//   LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
//   GREATER_THAN = "GREATER_THAN",
//   GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
// }

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

// TODO: Naming is shit here
export const createParseFilterFn = <T>(
  searchFields: Array<ISearchField<T>>
) => (condition: string): Filter<T> => {
  const match = condition.match(/^(\w*)(-?)(:|:>|:<|:>=|:<=)?(\w*|\*)$/i);
  if (!match) {
    throw new Error("TODO");
  }

  const [_, fieldName, not, comparator, value] = match;

  // TODO: Error handling
  // TODO: - Thorw an error when the $exists special case is used outside of : or -:

  // TODO: Move to a better place
  type Comparator = ":" | ":>" | ":>=" | ":<" | ":<=";

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

export const createParseQueryFn = <T>({
  searchTermFields,
  searchFields,
}: ICreateQueryParserOptions<T>) => {
  const parseFitler = createParseFilterFn<T>(searchFields);

  return (query: Maybe<string> | undefined): Filter<T> => {
    if (!query) return {};

    // TODO: Use regex to avoid matching strings like 'example with space' (including '')
    const filters = query.split(" ").map(parseFitler);

    return { $and: filters };

    // TODO: currently everything is an AND connective but we ofc should implement OR as well

    // const aaa = searchTermFields.map(
    //   (field): Filter<T> =>
    //     ({
    //       // tslint:disable-line no-object-literal-type-assertion
    //       [field as keyof T]: { $eq: query },
    //     } as { [P in keyof T]?: Condition<T[P]> | undefined })
    // );

    // return { $or: [...aaa] };

    // TODO: Parse Connectives -> https://shopify.dev/api/usage/search-syntax#connectives
    // TODO: Parse Modifier -> https://shopify.dev/api/usage/search-syntax#modifier
    // TODO: Parse Comparators -> https://shopify.dev/api/usage/search-syntax#comparators
    // TODO: Parse fields
    // TODO: Parse field-values
    // return {};
  };
};
