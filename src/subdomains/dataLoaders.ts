import createProductRatingDataLoaders, {
  ProductRatingDataLoaders,
} from "./productRating/dataloader";
import createProductRatingCommentDataLoaders, {
  ProductRatingCommentDataLoaders,
} from "./productRatingComment/dataloader";

export default class DataLoaders {
  public ProductRating: ProductRatingDataLoaders;
  public ProductRatingComment: ProductRatingCommentDataLoaders;

  constructor() {
    this.ProductRating = createProductRatingDataLoaders();
    this.ProductRatingComment = createProductRatingCommentDataLoaders();
  }
}
