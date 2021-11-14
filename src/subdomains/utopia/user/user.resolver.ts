import { QueryUserArgs, QueryUsersArgs } from "@generation/generated";
import { IContext } from "src/types";

import { gamificationInfos } from "./__mock__";

export default {
  Query: {
    me: (_: object, __: never, context: IContext) => {
      const meId = 1; // TODO Pretending to read user id from context
      return context.dataLoaders.User.byId.load(meId.toString());
    },
    user: (_: object, { id }: QueryUserArgs, context: IContext) => {
      return context.dataLoaders.User.byId.load(id);
    },
    users: (_: object, connection: QueryUsersArgs, context: IContext) => {
      return context.dataLoaders.User.byConnection.load(connection);
    },
  },
  User: {
    gamificationInfo: (source: any) => {
      return (
        gamificationInfos.find((info) => info.id === source.gamificationInfo) ||
        null
      );
    },
  },
};
