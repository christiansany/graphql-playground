import { Maybe } from "@generation/generated";
import { Condition, Filter } from "mongodb";

type Type = "string" | "number";

interface ISearchField<T> {
  field: keyof T;
  type: Type;
}

interface ICreateQueryParserOptions<T> {
  searchTermFields: Array<keyof T>;
  searchFields: Array<ISearchField<T>>;
}

const parseValue = (value: string, type: Type) => {
  switch (type) {
    case "string":
      return value;
    case "number":
      return Number(value);
  }
};

// TODO: Naming is shit here
const createParseFilterFn = <T>(searchFields: Array<ISearchField<T>>) => (
  condition: string
): Filter<T> => {
  const [fieldName, value] = condition.split(":") as [keyof T, string];

  const searchFieldConfig = searchFields.find(
    (config) => config.field === fieldName
  );

  if (!searchFieldConfig) {
    // TODO: Maybe better errorhandling than jsut a throw?
    throw new Error("TODO A query field is not in the allowed fields");
  }

  return {
    // tslint:disable-line no-object-literal-type-assertion
    [searchFieldConfig.field as keyof T]: {
      $eq: parseValue(value, searchFieldConfig.type),
    },
  } as { [P in keyof T]?: Condition<T[P]> | undefined };
};

export const createQueryParseFn = <T>({
  searchTermFields,
  searchFields,
}: ICreateQueryParserOptions<T>) => {
  const parseFitler = createParseFilterFn<T>(searchFields);

  return (query: Maybe<string> | undefined): Filter<T> => {
    if (!query) return {};

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
