import {
  ProductRatingCommentsArgs,
  QueryProductRatingCommentArgs,
  QueryProductRatingCommentsArgs,
  UserProductRatingCommentsArgs,
} from "@generation/generated";
import { IContext } from "src/types";

export default {
  Query: {
    productRatingComment: (
      _: object,
      { id }: QueryProductRatingCommentArgs,
      context: IContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byId.load(id);
    },
    productRatingComments: (
      _: object,
      connection: QueryProductRatingCommentsArgs,
      context: IContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byConnection.load(
        connection
      );
    },
  },
  ProductRatingComment: {
    creator: (source: any, _: never, context: IContext) => {
      return context.dataLoaders.User.byId.load(source.creator.toString());
    },
  },
  User: {
    productRatingComments: (
      source: any,
      connection: UserProductRatingCommentsArgs,
      context: IContext
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
      context: IContext
    ) => {
      return context.dataLoaders.ProductRatingComment.byConnection.load({
        ...connection,
        query: "rating=" + source.id.toString(), // TODO: in case of possible query, combine the two
      });
    },
  },
};
