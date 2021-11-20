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
import { createParseQueryFn } from "./query";

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
    sortKey = UserSortKey.ID, // This would not be necessary cuz it's in the schema, but... typescript needs this
    reverse,
  }: QueryUsersArgs): Promise<SourceUserConnection> {
    const collection: Collection<UserDocument> = this.collection;

    if (!first && !last) {
      throw new Error("TODO: Errormessage -> !first && !last");
    } else if (first && before) {
      throw new Error("TODO: Errormessage -> first && before");
    } else if (last && after) {
      throw new Error("TODO: Errormessage -> last && after");
    }

    // ... Typescript ...
    sortKey = sortKey || UserSortKey.ID;

    // TODO: Unify parser functions
    const fitlerQuery = createParseQueryFn<UserDocument>({
      // When there is no field specified in the query, but only a search term is provided
      searchTermFields: ["username", "email"],
      searchFields: [
        { field: "username", type: "string" },
        { field: "email", type: "string" },
        { field: "height", type: "number" },
      ],
    })(query);

    // TODO: Unify parser functions
    const sortFieldConfigs: ISortFieldConfigs<UserDocument> = {
      [UserSortKey.ID]: {
        field: "_id",
        parseValue: (value: string) => new ObjectId(value),
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

    // const { data, ...pageInfo } = await createPaginationFn<UserDocument>(
    //   sortFieldConfigs
    // )({
    //   first,
    //   after,
    //   last,
    //   before,
    //   sortKey,
    //   reverse,
    // });

    let hasPreviousPage = false;
    let hasNextPage = false;
    let startCursor;
    let endCursor;

    let data: UserDocument[] = [];
    let dataset: FindCursor<UserDocument>;

    let sort: Sort;

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

    let paginationQuery: Filter<UserDocument> = {};

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

    console.log({
      fitlerQuery: JSON.stringify(fitlerQuery),
      paginationQuery: JSON.stringify(paginationQuery),
      sort,
    });

    // TODO Fix as
    const limit = first ? first : (last as number);

    dataset = collection
      .find({ $and: [fitlerQuery, paginationQuery] })
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

    const connectionResponse: SourceUserConnection = {
      edges: data.map((user) => ({
        node: user,
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
