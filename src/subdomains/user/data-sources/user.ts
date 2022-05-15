import {
  QueryUserArgs,
  QueryUsersArgs,
  UserCreateInput,
  UserSortKey,
  UserUpdateInput,
} from "__generated__/schema.generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, Collection } from "mongodb";
import {
  UserDocument,
  SourceUserConnection,
  SourceUserCreatePayload,
  SourceUserUpdatePayload,
} from "./user.types";
import { createParseQueryFn } from "../../../tools/query";
import {
  createPaginatedMongoDBDataFn,
  ISortFieldConfigs,
  validatePaginationArgs,
} from "../../../tools/pagination";

const createFilterQuery = createParseQueryFn<UserDocument>({
  // When there is no field specified in the query, but only a search term is provided
  searchTermFields: ["username", "email"],
  searchFields: [
    { field: "username", type: "string" },
    { field: "email", type: "string" },
    { field: "height", type: "number" },
  ],
});

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

// TODO Types and stuff
export default class UsersAPI extends MongoDataSource<UserDocument> {
  private getPage;
  constructor(modelOrCollection: any) {
    super(modelOrCollection);

    this.getPage = createPaginatedMongoDBDataFn<UserDocument, UserSortKey>(
      this.collection,
      sortFieldConfigs
    );
  }

  public async getById({ id }: QueryUserArgs): Promise<UserDocument | null> {
    return (await this.findOneById(id)) || null;
  }

  public async getByConnection({
    query: rawQuery,
    sortKey = UserSortKey.ID,
    reverse = false,
    ...paginationArgs
  }: QueryUsersArgs): Promise<SourceUserConnection> {
    // Validation
    validatePaginationArgs({ ...paginationArgs });

    // TODO: Unify parser functions
    const query = createFilterQuery(rawQuery);

    const connectionResponse = await this.getPage({
      ...paginationArgs,
      query,
      sortKey,
      reverse,
    });

    return connectionResponse;
  }

  public async createUser(
    input: UserCreateInput
  ): Promise<SourceUserCreatePayload> {
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
  ): Promise<SourceUserUpdatePayload> {
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
