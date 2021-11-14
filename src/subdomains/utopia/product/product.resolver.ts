import {
  QueryProductRatingArgs,
  QueryProductRatingsArgs,
} from "@generation/generated";
import { IContext } from "src/types";

export default {
  Query: {
    product: (_: never, { id }: QueryProductRatingArgs, context: IContext) => {
      return context.dataLoaders.Product.byId.load(id);
    },
    products: (
      _: never,
      connection: QueryProductRatingsArgs,
      context: IContext
    ) => {
      return context.dataLoaders.Product.byConnection.load(connection);
    },
  },
};
