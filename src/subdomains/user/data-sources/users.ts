import {
  QueryUsersArgs,
  UserCreateInput,
  UserSortKey,
  UserUpdateInput,
} from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, Collection } from "mongodb";
import {
  UserDocument,
  SourceUserConnection,
  SourceUserCreateResponse,
  SourceUserUpdateResponse,
} from "./users.types";
import { createParseQueryFn } from "../../../tools/query";
import {
  createPaginatedMongoDBDataFn,
  ISortFieldConfigs,
} from "../../../tools/pagination";

const filter = createParseQueryFn<UserDocument>({
  // When there is no field specified in the query, but only a search term is provided
  searchTermFields: ["username", "email"],
  searchFields: [
    { field: "username", type: "string" },
    { field: "email", type: "string" },
    { field: "height", type: "number" },
  ],
});

export default class UsersAPI extends MongoDataSource<UserDocument> {
  public async getById(id: ObjectId): Promise<UserDocument | null | undefined> {
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

    // TODO: Unify parser functions
    const fitlerQuery = filter(query);

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

  public async updateUser(
    input: UserUpdateInput
  ): Promise<SourceUserUpdateResponse> {
    const collection: Collection<UserDocument> = this.collection;
    const { id, ...rest } = input;
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return {
        userErrors: [
          {
            message: "User not found",
          },
        ],
      };
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...rest } }
    );

    return {
      userErrors: [],
      user: {
        ...user,
      },
    };
  }
}
