import {
  ProductProductRatingsArgs,
  QueryProductRatingArgs,
  QueryProductRatingsArgs,
  UserProductRatingsArgs,
} from "@generation/generated";
import { IContext } from "src/types";

import { productRatings } from "./__mock__";

export default {
  Query: {
    productRating: (
      _: object,
      { id }: QueryProductRatingArgs,
      context: IContext
    ) => {
      return context.dataLoaders.ProductRating.byId.load(id);
    },
    productRatings: (
      _: object,
      connection: QueryProductRatingsArgs,
      context: IContext
    ) => {
      return context.dataLoaders.ProductRating.byConnection.load(connection);
    },
  },
  ProductRating: {
    product: (source: any, _: never, context: IContext) => {
      return context.dataLoaders.Product.byId.load(source.product.toString());
    },
    creator: (source: any, _: never, context: IContext) => {
      return context.dataLoaders.User.byId.load(source.creator.toString());
    },
  },
  User: {
    productRatings: (
      source: any,
      connection: UserProductRatingsArgs,
      context: IContext
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
      context: IContext
    ) => {
      return context.dataLoaders.ProductRating.byConnection.load({
        ...connection,
        query: "product=" + source.id.toString(), // TODO: in case of possible query, combine the two
      });
    },
  },
};
