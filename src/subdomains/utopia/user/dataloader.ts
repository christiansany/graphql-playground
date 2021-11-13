import {
  Connection,
  Edge,
  Maybe,
  PageInfo,
  User,
  Scalars,
} from "@generation/generated";
import DataLoader from "dataloader";
import { createSmartCollection } from "../utils";

import { users } from "./__mock__";
const UserCollection = createSmartCollection(users, ["id"]);

interface UserByConnectionArgs {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
}

type UserEdge = Edge & {
  cursor: Scalars["String"];
  node: Partial<User>;
};

type UserConnection = Connection & {
  edges: UserEdge[];
  pageInfo: PageInfo;
};

export type UserDataLoaders = {
  byId: DataLoader<string, Partial<User> | null>;
  byConnection: DataLoader<UserByConnectionArgs, UserConnection, string>;
};

const createDataLoaders = (): UserDataLoaders => {
  return {
    // ! Linting error because the response type os not correct -> gamification
    byId: new DataLoader(async (ids) => {
      // Sleep for fake connection latency
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });

      // This should roughly be the way to consume data later on
      // In a real world scenario, an API call would be made here
      // return ids.map(id => DataCollection.indexes?.id?.[id] || null);

      return ids.map((id) => {
        const user = users.find((p) => p.id.toString() === id);
        if (!user) {
          return null;
        }

        return {
          ...user,
          id: user?.id.toString(),
        };
      });
    }),
    // ! Linting error because the response type os not correct -> gamification
    byConnection: new DataLoader(
      async (connections) => {
        // Sleep for fake connection latency
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });

        return connections.map((connection) => {
          return UserCollection.paginate(connection);
        });
      },
      {
        cacheKeyFn: (payload) => {
          return JSON.stringify(payload); // Never do in production
        },
      }
    ),
  };
};

export default createDataLoaders;
