import {
  QueryUserArgs,
  QueryUsersArgs,
  UserCreateInput,
  UserUpdateInput,
} from "@generation/generated";
import { GraphQLCustomResolversContext } from "src/server/types";
import { ObjectId } from "mongodb";
import { UserDocument } from "./data-sources/users.types";

export default {
  Query: {
    me: (
      _: never,
      __: never,
      { dataSources }: GraphQLCustomResolversContext
    ) => {
      // TODO Pretending to read user id from context
      const mongoId = new ObjectId("6190f2fb58ae481e2c235fd8");
      return dataSources.users.getUserById(mongoId);
    },
    user: (
      _: never,
      { id }: QueryUserArgs,
      { dataSources }: GraphQLCustomResolversContext
    ) => {
      const mongoId = new ObjectId(id);
      return dataSources.users.getUserById(mongoId);
    },
    users: (
      _: never,
      connection: QueryUsersArgs,
      { dataSources }: GraphQLCustomResolversContext
    ) => {
      return dataSources.users.getUsersByConnection(connection);
    },
  },
  Mutation: {
    userCreate: (
      _: never,
      { input }: { input: UserCreateInput },
      { dataSources }: GraphQLCustomResolversContext
    ) => {
      return dataSources.users.createUser(input);
    },
    userUpdate: (
      _: never,
      { input }: { input: UserUpdateInput },
      { dataSources }: GraphQLCustomResolversContext
    ) => {
      return dataSources.users.updateUser(input);
    },
  },
  User: {
    id: (parent: UserDocument) => parent._id,
  },
};
