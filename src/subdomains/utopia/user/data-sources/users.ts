import {
  QueryUsersArgs,
  UserCreateInput,
  UserSortKey,
} from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, FindCursor, Collection, Filter, Sort } from "mongodb";
import {
  UserDocument,
  SourceUserConnection,
  SourceUserCreateResponse,
} from "./users.types";
import btoa from "btoa";
import atob from "atob";

const parseCursor: (endodedString: string) => string[] = (endodedString) =>
  atob(endodedString).split(":");

interface SortFieldConfig<T> {
  field: keyof T;
  parseValue?: (value: string) => any; // tslint:disable-line no-any
  unique?: boolean;
}

interface ISortFieldConfigs<T> {
  [key: string]: SortFieldConfig<T>;
}

// function generatePaginationQuery(query, sort, nextKey) {
//   const sortField = sort == null ? null : sort[0];

//   function nextKeyFn(items) {
//     if (items.length === 0) {
//       return null;
//     }

//     const item = items[items.length - 1];

//     if (sortField == null) {
//       return { _id: item._id };
//     }

//     return { _id: item._id, [sortField]: item[sortField] };
//   }

//   if (nextKey == null) {
//     return { query, nextKeyFn };
//   }

//   let paginatedQuery = query;

//   if (sort == null) {
//     paginatedQuery._id = { $gt: nextKey._id };
//     return { paginatedQuery, nextKey };
//   }

//   const sortOperator = sort[1] === 1 ? "$gt" : "$lt";

//   const paginationQuery = [
//     { [sortField]: { [sortOperator]: nextKey[sortField] } },
//     {
//       $and: [
//         { [sortField]: nextKey[sortField] },
//         { _id: { [sortOperator]: nextKey._id } },
//       ],
//     },
//   ];

//   if (paginatedQuery.$or == null) {
//     paginatedQuery.$or = paginationQuery;
//   } else {
//     paginatedQuery = { $and: [query, { $or: paginationQuery }] };
//   }

//   return { paginatedQuery, nextKeyFn };
// }

export default class UsersAPI extends MongoDataSource<UserDocument> {
  public async getUserById(
    id: ObjectId
  ): Promise<UserDocument | null | undefined> {
    return this.findOneById(id);
  }

  public async getUsersByConnection({
    first,
    after,
    last,
    before,
    query,
    sortKey = UserSortKey.ID, // This would not be necessary cuz it's in the schema, but... typescript eneds this
    reverse,
  }: QueryUsersArgs): Promise<SourceUserConnection> {
    const collection: Collection<UserDocument> = this.collection;

    if (!first && !last) {
      throw new Error("TODO: Errormessage -> !first && !last");
    }

    // ... Typescript ...
    sortKey = sortKey || UserSortKey.ID;

    console.log({ reverse, sortKey });

    // TODO: Validation of the args and potential throw when not good.
    // - Either first or last msut be set
    // - after can only be used in combination with first
    // - before can only be used in combination with last
    // - query parser that throws if a query is invalid
    //   - Maybe there can be a debug mode, where in dev mode more information is given about the error

    let hasPreviousPage = false;
    let hasNextPage = false;
    let startCursor;
    let endCursor;

    let data: UserDocument[] = [];
    let dataset: FindCursor<UserDocument>;

    let options: Filter<UserDocument> = {
      // email: { $eq: "alligator0@gmail.com" },
    };

    let sort: Sort;
    // let sortField: keyof UserDocument | undefined;

    // enum Actions {
    //   EQUALS = "EQUALS",
    //   LESS_THAN = "LESS_THAN",
    //   LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
    //   GREATER_THAN = "GREATER_THAN",
    //   GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
    // }

    // const queryParser = createQueryParser({
    //   // When there is no field specified in the query, but only a search term is provided
    //   termSearchFields: ["username", "email"],
    //   //
    //   fieldSearchFields: [
    //     {
    //       fieldName: "username",
    //       type: "string", // ?? How
    //       allowedActions: [Actions.EQUALS],
    //     },
    //     {
    //       fieldName: "email",
    //       type: "string", // ?? How
    //       allowedActions: [Actions.EQUALS],
    //     },
    //     {
    //       fieldName: "age",
    //       type: "int", // ?? How
    //       allowedActions: [
    //         Actions.EQUALS,
    //         Actions.LESS_THAN,
    //         Actions.LESS_THAN_OR_EQUAL_TO,
    //         Actions.GREATER_THAN,
    //         Actions.GREATER_THAN_OR_EQUAL_TO,
    //       ],
    //     },
    //   ],
    // });

    // If there are things inside the query, that are not allowed, we provide errors that can be sent as a response to the consumer
    // const { parsedQuery, errors } = queryParser(query);

    // TODO: Somethign is not working correctly when reversing the height and the using last & before

    const sortFieldConfigs: ISortFieldConfigs<UserDocument> = {
      [UserSortKey.ID]: {
        field: "_id",
        unique: true,
      },
      [UserSortKey.USERNAME]: {
        field: "username",
      },
      [UserSortKey.EMAIL]: {
        field: "email",
        unique: true,
      },
      [UserSortKey.HEIGHT]: {
        field: "height",
        parseValue: (value: string) => Number(value),
      },
    };

    const {
      field: sortField,
      unique: sortFieldIsUnique = false,
      parseValue: sortFieldParser,
    } = sortFieldConfigs[sortKey];

    const createCursor = (doc: UserDocument) =>
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
    let paginationQuery = {};

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
              $and: [
                {
                  [sortField]: sortFieldParser
                    ? sortFieldParser(sortFieldValue)
                    : sortFieldValue,
                },
                { _id: { [sortOperator]: id } },
              ],
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
        paginationQuery = { _id: { [sortOperator]: id } };
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

    console.log({ paginationQuery: JSON.stringify(paginationQuery) });

    dataset = collection
      .find({ $and: [options, paginationQuery] })
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

    // TODO: This doesn't work at all... the whole sorting must be switched
    // if (reverse) {
    //   data.reverse();
    // }

    startCursor = data.length ? createCursor(data[0]) : null;
    endCursor = data.length ? createCursor(data[data.length - 1]) : null;

    const connectionResponse: SourceUserConnection = {
      edges: data.map((user) => ({
        node: {
          ...user,
        },
        cursor: createCursor(user),
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };

    return connectionResponse;
  }

  public async createUser(
    input: UserCreateInput
  ): Promise<SourceUserCreateResponse> {
    const collection: Collection<UserDocument> = this.collection;
    const existingUser = await collection.findOne({ email: input.email });

    if (existingUser) {
      return {
        userErrors: [
          {
            message: "User already exists",
          },
        ],
      };
    }

    const doc = { ...input };
    const result = await collection.insertOne(doc);

    return {
      userErrors: [],
      user: {
        _id: result.insertedId,
        ...doc,
      },
    };
  }
}
