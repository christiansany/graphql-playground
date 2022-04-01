import {
  ProductProductRatingsArgs,
  QueryProductRatingArgs,
  QueryProductRatingsArgs,
  UserProductRatingsArgs,
} from "@generation/generated";
import { GraphQLCustomResolversContext } from "src/server/types";

import { productRatings } from "./__mock__";

export default {
  Query: {
    productRating: (
      _: never,
      { id }: QueryProductRatingArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRating.byId.load(id);
    },
    productRatings: (
      _: never,
      connection: QueryProductRatingsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRating.byConnection.load(connection);
    },
  },
  ProductRating: {
    product: (
      source: any,
      _: never,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.Product.byId.load(source.product.toString());
    },
    creator: (
      source: any,
      _: never,
      { dataSources: { users } }: GraphQLCustomResolversContext
    ) => users.getById(source.creator.toString()),
  },
  User: {
    productRatings: (
      source: any,
      connection: UserProductRatingsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRating.byConnection.load({
        ...connection,
        query: "creator=" + source.id.toString(), // TODO: in case of possible query, combine the two
      });
    },
  },
  Product: {
    productRatingsSummary: (source: any) => {
      const ratings = productRatings.filter(
        (rating) => rating.product.toString() === source.id.toString()
      );

      return {
        averageRating:
          ratings.reduce((acc, rating) => {
            return acc + rating.ratingScore;
          }, 0) / ratings.length,
        totalRatings: ratings.length,
      };
    },
    productRatings: (
      source: any,
      connection: ProductProductRatingsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRating.byConnection.load({
        ...connection,
        query: "product=" + source.id.toString(), // TODO: in case of possible query, combine the two
      });
    },
  },
};
