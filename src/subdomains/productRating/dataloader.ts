import {
  Connection,
  Edge,
  Maybe,
  PageInfo,
  ProductRating,
  Scalars,
} from "__generated__/schema.generated";
import DataLoader from "dataloader";
import { createSmartCollection } from "../utils";

import { productRatings } from "./__mock__";
const ProductRatingCollection = createSmartCollection(productRatings, ["id"]);

interface ProductRatingByConnectionArgs {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
}

type ProductRatingEdge = Edge & {
  cursor: Scalars["String"];
  node: Partial<ProductRating>;
};

type ProductRatingConnection = Connection & {
  edges: ProductRatingEdge[];
  pageInfo: PageInfo;
};

export type ProductRatingDataLoaders = {
  byId: DataLoader<string, Partial<ProductRating> | null>;
  byConnection: DataLoader<
    ProductRatingByConnectionArgs,
    ProductRatingConnection,
    string
  >;
};

const createDataLoaders = (): ProductRatingDataLoaders => {
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
        const productRating = productRatings.find(
          (p) => p.id.toString() === id
        );
        if (!productRating) {
          return null;
        }

        return {
          ...productRating,
          id: productRating?.id.toString(),
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
          return ProductRatingCollection.paginate(connection);
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
