import { Maybe } from "@generation/generated";
import btoa from "btoa";
import atob from "atob";
import {
  ObjectId,
  FindCursor,
  Collection,
  Filter,
  Sort,
  Document,
} from "mongodb";

const parseCursor: (endodedString: string) => string[] = (endodedString) =>
  atob(endodedString).split(":");

export interface SortFieldConfig<T> {
  field: keyof T;
  parseValue?: (value: string) => any; // tslint:disable-line no-any
  unique?: boolean;
}

export interface ISortFieldConfigs<T> {
  [key: string]: SortFieldConfig<T>;
}

type PaginationArgs<T, SortKey> = {
  first?: Maybe<number> | undefined;
  last?: Maybe<number> | undefined;
  before?: Maybe<string> | undefined;
  after?: Maybe<string> | undefined;
  query: Filter<T>;
  sortKey: SortKey;
  reverse?: Maybe<boolean> | undefined;
};

export const createPaginatedMongoDBDataFn = <T extends Document, SortKey>(
  collection: Collection<T>,
  sortFieldConfigs: ISortFieldConfigs<T>
) => {
  return async ({
    first,
    after,
    last,
    before,
    query,
    sortKey,
    reverse,
  }: PaginationArgs<T, SortKey>) => {
    let hasPreviousPage = false;
    let hasNextPage = false;
    let startCursor;
    let endCursor;

    let data: T[] = [];
    let dataset: FindCursor<T>;

    let sort: Sort;

    const {
      field: sortField,
      unique: sortFieldIsUnique = false,
      parseValue: sortFieldParser,
    } = sortFieldConfigs[sortKey];

    const createCursor = (doc: T) =>
      btoa(`${doc._id.toString()}:${sortField ? doc[sortField] : null}`);

    const sortConfigs = {
      ascending: !reverse
        ? ({ sort: 1, operator: "$gt" } as const)
        : ({ sort: -1, operator: "$lt" } as const),
      decending: !reverse
        ? ({ sort: -1, operator: "$lt" } as const)
        : ({ sort: 1, operator: "$gt" } as const),
    };

    if (sortField && sortField !== "_id" && !sortFieldIsUnique) {
      sort = first
        ? {
            [sortField]: sortConfigs.ascending.sort,
            _id: sortConfigs.ascending.sort,
          }
        : {
            [sortField]: sortConfigs.decending.sort,
            _id: sortConfigs.decending.sort,
          };
    } else if (sortField && sortField !== "_id" && sortFieldIsUnique) {
      sort = first
        ? { [sortField]: sortConfigs.ascending.sort }
        : { [sortField]: sortConfigs.decending.sort };
    } else {
      sort = first
        ? { _id: sortConfigs.ascending.sort }
        : { _id: sortConfigs.decending.sort };
    }

    const sortOperator = first
      ? sortConfigs.ascending.operator
      : sortConfigs.decending.operator;

    let paginationQuery: Filter<T> = {};

    if (after || before) {
      // TODO fix as
      const [id, sortFieldValue] = parseCursor(after || (before as string));

      // TODO: This is super shitty to read
      if (
        sortField &&
        sortField !== "_id" &&
        sortFieldValue &&
        !sortFieldIsUnique
      ) {
        paginationQuery = {
          $or: [
            {
              [sortField]: {
                [sortOperator]: sortFieldParser
                  ? sortFieldParser(sortFieldValue)
                  : sortFieldValue,
              },
            },
            {
              [sortField]: sortFieldParser
                ? sortFieldParser(sortFieldValue)
                : sortFieldValue,
              _id: { [sortOperator]: new ObjectId(id) },
            },
          ],
        };
      } else if (
        sortField &&
        sortField !== "_id" &&
        sortFieldValue &&
        sortFieldIsUnique
      ) {
        paginationQuery = {
          [sortField]: {
            [sortOperator]: sortFieldParser
              ? sortFieldParser(sortFieldValue)
              : sortFieldValue,
          },
        };
      } else {
        paginationQuery = { _id: { [sortOperator]: new ObjectId(id) } };
      }
    }

    if (after) {
      hasPreviousPage = true;
    }
    if (before) {
      hasNextPage = true;
    }

    // TODO Fix as
    const limit = first ? first : (last as number);

    dataset = collection
      .find({ $and: [query, paginationQuery] })
      .sort(sort)
      .limit(limit + 1);
    data = await dataset.toArray();

    if (first) {
      hasNextPage = data.length === limit + 1;
      if (hasNextPage) data.pop();
    }

    if (last) {
      hasPreviousPage = data.length === limit + 1;
      if (hasPreviousPage) data.pop();
      // Reverse array again, since we had to reverse the array in the find
      // This also corrects the start and end cursor
      data.reverse();
    }

    startCursor = data.length ? createCursor(data[0]) : null;
    endCursor = data.length ? createCursor(data[data.length - 1]) : null;

    const edges = data.map((user) => ({
      node: user,
      cursor: createCursor(user),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };
  };
};
