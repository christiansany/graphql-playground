import {
  ProductCreateInput,
  ProductUpdateInput,
  QueryProductArgs,
  QueryProductsArgs,
} from "@generation/generated";
import { GraphQLCustomResolversContext } from "src/server/types";
import { dataSourcesHelpers } from "src/tools/data-sources-helper";
import { ProductDocument } from "./data-sources/product.types";

const dataSourcesHelper = dataSourcesHelpers<
  "products",
  QueryProductArgs,
  QueryProductsArgs
>("products");

export default {
  Query: {
    product: dataSourcesHelper.getById,
    products: dataSourcesHelper.getByConnection,
  },
  Mutation: {
    productCreate: (
      _: never,
      { input }: { input: ProductCreateInput },
      { dataSources: { products } }: GraphQLCustomResolversContext
    ) => products.createProduct(input),
    productUpdate: (
      _: never,
      { input }: { input: ProductUpdateInput },
      { dataSources: { products } }: GraphQLCustomResolversContext
    ) => products.updateProduct(input),
  },
  Product: {
    id: (parent: ProductDocument) => parent._id,
  },
};
