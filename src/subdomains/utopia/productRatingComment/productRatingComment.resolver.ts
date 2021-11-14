import {
  ProductRatingCommentsArgs,
  QueryProductRatingCommentArgs,
  QueryProductRatingCommentsArgs,
  UserProductRatingCommentsArgs,
} from "@generation/generated";
import { GraphQLCustomResolversContext } from "src/server/types";

export default {
  Query: {
    productRatingComment: (
      _: never,
      { id }: QueryProductRatingCommentArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byId.load(id);
    },
    productRatingComments: (
      _: never,
      connection: QueryProductRatingCommentsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byConnection.load(
        connection
      );
    },
  },
  ProductRatingComment: {
    creator: (
      source: any,
      _: never,
      { dataSources }: GraphQLCustomResolversContext
    ) => {
      return dataSources.users.getUserById(source.creator.toString());
    },
  },
  User: {
    productRatingComments: (
      source: any,
      connection: UserProductRatingCommentsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byConnection.load({
        ...connection,
        query: "creator=" + source.id.toString(), // TODO: in case of possible query, combine the two
      });
    },
  },
  ProductRating: {
    comments: (
      source: any,
      connection: ProductRatingCommentsArgs,
      context: GraphQLCustomResolversContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byConnection.load({
        ...connection,
        query: "rating=" + source.id.toString(), // TODO: in case of possible query, combine the two
      });
    },
  },
};
