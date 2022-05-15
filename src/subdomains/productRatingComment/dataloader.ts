import {
  Connection,
  Edge,
  Maybe,
  PageInfo,
  ProductRatingComment,
  Scalars,
} from "__generated__/schema.generated";
import DataLoader from "dataloader";
import { createSmartCollection } from "../utils";

import { productRatingComments } from "./__mock__";
const ProductRatingCommentCollection = createSmartCollection(
  productRatingComments,
  ["id"]
);

interface ProductRatingCommentByConnectionArgs {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
}

type ProductRatingCommentEdge = Edge & {
  cursor: Scalars["String"];
  node: Partial<ProductRatingComment>;
};

type ProductRatingCommentConnection = Connection & {
  edges: ProductRatingCommentEdge[];
  pageInfo: PageInfo;
};

export type ProductRatingCommentDataLoaders = {
  byId: DataLoader<string, Partial<ProductRatingComment> | null>;
  byConnection: DataLoader<
    ProductRatingCommentByConnectionArgs,
    ProductRatingCommentConnection,
    string
  >;
};

const createDataLoaders = (): ProductRatingCommentDataLoaders => {
  return {
    // ! Linting error because the response type os not correct -> creater is a number anf not of type User
    // ! This is, because hte creator is being separately resovled into a User, and does not exist in raw data
    byId: new DataLoader(async (ids) => {
      // Sleep for fake connection latency
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });

      // This should roughly be the way to consume data later on
      // In a real world scenario, an API call would be made here
      // return ids.map(id => DataCollection.indexes?.id?.[id] || null);

      return ids.map((id) => {
        const productRatingComment = productRatingComments.find(
          (p) => p.id.toString() === id
        );
        if (!productRatingComment) {
          return null;
        }

        return {
          ...productRatingComment,
          id: productRatingComment?.id.toString(),
        };
      });
    }),
    // ! Linting error because the response type os not correct -> creater is a number anf not of type User
    // ! This is, because hte creator is being separately resovled into a User, and does not exist in raw data
    byConnection: new DataLoader(
      async (connections) => {
        // Sleep for fake connection latency
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });

        return connections.map((connection) => {
          return ProductRatingCommentCollection.paginate(connection);
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
