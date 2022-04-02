import {
  QueryUserArgs,
  QueryUsersArgs,
  UserCreateInput,
  UserUpdateInput,
} from "@generation/generated";
import { GraphQLCustomResolversContext } from "src/server/types";
import { ObjectId } from "mongodb";
import { UserDocument } from "./data-sources/users.types";
import { dataSourcesHelpers } from "src/tools/data-sources-helper";

const dataSourcesHelper = dataSourcesHelpers<QueryUserArgs, QueryUsersArgs>(
  "users"
);

export default {
  Query: {
    me: (
      _: never,
      __: never,
      { dataSources: { users } }: GraphQLCustomResolversContext
    ) => {
      // TODO Pretending to read user id from context
      return users.getById(new ObjectId("6190f2fb58ae481e2c235fd8"));
    },
    user: dataSourcesHelper.getById,
    users: dataSourcesHelper.getByConnection,
  },
  Mutation: {
    userCreate: (
      _: never,
      { input }: { input: UserCreateInput },
      { dataSources: { users } }: GraphQLCustomResolversContext
    ) => users.createUser(input),
    userUpdate: (
      _: never,
      { input }: { input: UserUpdateInput },
      { dataSources: { users } }: GraphQLCustomResolversContext
    ) => users.updateUser(input),
  },
  User: {
    id: (parent: UserDocument) => parent._id,
  },
};
