import { QueryUserArgs, QueryUsersArgs } from "@generation/generated";
import { IContext } from "src/types";

export default {
  Query: {
    me: (_: never, __: never, context: IContext) => {
      const meId = 1; // TODO Pretending to read user id from context
      return context.dataLoaders.User.byId.load(meId.toString());
    },
    user: (_: never, { id }: QueryUserArgs, context: IContext) => {
      return context.dataLoaders.User.byId.load(id);
    },
    users: (_: never, connection: QueryUsersArgs, context: IContext) => {
      return context.dataLoaders.User.byConnection.load(connection);
    },
  },
};
