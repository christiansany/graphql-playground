import {
  QueryUsersArgs,
  UserCreateInput,
  UserSortKey,
} from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, Collection } from "mongodb";
import {
  UserDocument,
  SourceUserConnection,
  SourceUserCreateResponse,
} from "./users.types";
import { createParseQueryFn } from "./query";
import { createPaginatedMongoDBDataFn, ISortFieldConfigs } from "./pagination";

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
    sortKey,
    reverse,
  }: QueryUsersArgs): Promise<SourceUserConnection> {
    const collection: Collection<UserDocument> = this.collection;

    // ... Typescript ...
    sortKey = sortKey || UserSortKey.ID;

    // TODO These can be moved to a better place too...
    if (!first && !last) {
      throw new Error("TODO: Errormessage -> !first && !last");
    } else if (first && before) {
      throw new Error("TODO: Errormessage -> first && before");
    } else if (last && after) {
      throw new Error("TODO: Errormessage -> last && after");
    }

    // const queryData = createMongoDbQueryAndPaginationFn({
    //   fields: [
    //     {
    //       name: "_id",
    //       searchable: false,
    //       sortable: true,
    //       unique: true,
    //       parser: (value: string) => new ObjectId(value),
    //     },
    //     {
    //       name: "username",
    //       searchable: true,
    //       sortable: true,
    //       unique: false,
    //       // parser: (value: string) => value,
    //     },
    //     {
    //       name: "email",
    //       searchable: true,
    //       sortable: true,
    //       unique: true,
    //       // parser: (value: string) => value,
    //     },
    //     {
    //       name: "height",
    //       searchable: true,
    //       sortable: true,
    //       unique: false,
    //       parser: (value: string) => Number(value),
    //     },
    //   ],
    //   sortKeyMap: {
    //     [UserSortKey.ID]: "_id",
    //     [UserSortKey.USERNAME]: "username",
    //     [UserSortKey.EMAIL]: "email",
    //     [UserSortKey.HEIGHT]: "height",
    //   },
    // });

    // const connectionResponse2 = queryData({
    //   first,
    //   after,
    //   last,
    //   before,
    //   query,
    //   sortKey,
    //   reverse,
    // });

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

    const connectionResponse = await createPaginatedMongoDBDataFn<
      UserDocument,
      UserSortKey
    >(
      collection,
      sortFieldConfigs
    )({
      first,
      after,
      last,
      before,
      query: fitlerQuery,
      sortKey,
      reverse,
    });

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
