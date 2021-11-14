import {
  QueryProductRatingArgs,
  QueryProductRatingsArgs,
} from "@generation/generated";
import { GraphQLCustomResolversContext } from "src/server/types";

export default {
  Query: {
    product: (
      _: never,
      { id }: QueryProductRatingArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.Product.byId.load(id);
    },
    products: (
      _: never,
      connection: QueryProductRatingsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.Product.byConnection.load(connection);
    },
  },
};
