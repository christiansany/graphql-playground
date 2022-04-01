import {
  Connection,
  Edge,
  Maybe,
  PageInfo,
  Product,
  Scalars,
} from "@generation/generated";
import DataLoader from "dataloader";
import { createSmartCollection } from "../utils";

import { products } from "./__mock__";
const ProductCollection = createSmartCollection(products, ["id"]);

interface ProductByQueryPayload {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
}

export type ProductEdge = Edge & {
  cursor: Scalars["String"];
  node: Partial<Product>;
};

type ProductConnection = Connection & {
  edges: ProductEdge[];
  pageInfo: PageInfo;
};

export type ProductDataLoaders = {
  byId: DataLoader<string, Partial<Product> | null>;
  byConnection: DataLoader<ProductByQueryPayload, ProductConnection, string>;
};

const createDataLoaders = (): ProductDataLoaders => {
  return {
    byId: new DataLoader(async (ids) => {
      // Sleep for fake connection latency
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });

      // This should roughly be the way to consume data later on
      // In a real world scenario, an API call would be made here
      // return ids.map(id => DataCollection.indexes?.id?.[id] || null);

      return ids.map((id) => {
        const product = products.find((p) => p.id.toString() === id);
        if (!product) {
          return null;
        }

        return {
          ...product,
          id: product?.id.toString(),
        };
      });
    }),
    byConnection: new DataLoader(
      async (connections) => {
        // Sleep for fake connection latency
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });

        return connections.map((connection) => {
          return ProductCollection.paginate(connection);

          // first = !first && !last ? 50 : first;

          // if (!first) {
          //   throw new Error("Currently first must be given");
          // }

          // return {
          //   edges: products.slice(0, first).map((product) => ({
          //     node: {
          //       ...product,
          //       id: product.id.toString(),
          //     },
          //     cursor: Buffer.from(product.id.toString(), "utf-8").toString(
          //       "base64"
          //     ),
          //   })),
          //   pageInfo: {
          //     startCursor: "start-fake-shizzle",
          //     endCursor: "end-fake-shizzle",
          //     hasNextPage: true,
          //     hasPreviousPage: false,
          //   },
          // };
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
