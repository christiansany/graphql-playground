import { QueryUsersArgs, UserCreateInput } from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, FindCursor, Collection } from "mongodb";
import {
  UserDocument,
  SourceUserConnection,
  SourceUserCreateResponse,
} from "./users.types";

export default class UsersAPI extends MongoDataSource<UserDocument> {
  public async getUserById(
    id: ObjectId
  ): Promise<UserDocument | null | undefined> {
    return this.findOneById(id);
  }

  public async getUsersByConnection(
    connection: QueryUsersArgs
  ): Promise<SourceUserConnection> {
    const collection: Collection<UserDocument> = this.collection;

    const options = {};
    let dataset: FindCursor<UserDocument> = collection.find(options);

    if (connection.first) {
      dataset = dataset.limit(connection.first);
    }

    const data = await dataset.toArray();

    const connectionResponse: SourceUserConnection = {
      edges: data.map((user) => ({
        node: {
          ...user,
        },
        cursor: "asdlm",
      })),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "asda",
        endCursor: "aölsdknmalkd",
      },
    };

    return connectionResponse;
  }

  public async createUser(
    input: UserCreateInput
  ): Promise<SourceUserCreateResponse> {
    const collection: Collection<UserDocument> = this.collection;
    const existingUser = await collection
      .find({ email: input.email })
      .limit(1)
      .toArray();

    if (existingUser.length > 0) {
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
