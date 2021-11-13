import {
  QueryProductRatingArgs,
  QueryProductRatingsArgs,
} from "@generation/generated";
import { IContext } from "src/types";

export default {
  Query: {
    product: (_: object, { id }: QueryProductRatingArgs, context: IContext) => {
      return context.dataLoaders.Product.byId.load(id);
    },
    products: (
      _: object,
      connection: QueryProductRatingsArgs,
      context: IContext
    ) => {
      return context.dataLoaders.Product.byConnection.load(connection);
    },
  },
  ProductRating: {
    product: (source: any, _: never, context: IContext) => {
      return context.dataLoaders.Product.byId.load(source.product.toString());
    },
  },
};
