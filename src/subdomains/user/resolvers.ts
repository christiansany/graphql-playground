import { Resolvers } from "__generated__/schema.generated";
import { generateGID, parseGID } from "src/tools/gid";

const resolvers: Resolvers = {
  Query: {
    me: (_, __, { dataSources: { User } }) =>
      User.getById({ id: "6190f2fb58ae481e2c235fd8" }),
    user: (_, { id }, { dataSources: { User } }) =>
      User.getById({ id: parseGID(id).id }),
    users: (_, args, { dataSources: { User } }) => User.getByConnection(args),
  },
  Mutation: {
    userCreate: (_, { input }, { dataSources: { User } }) =>
      User.createUser(input),
    userUpdate: (_, { input }, { dataSources: { User } }) =>
      User.updateUser({ ...input, id: parseGID(input.id).id }),
  },
  User: {
    id: (source) => generateGID("User", source._id.toString()),
  },
};

export default resolvers;
