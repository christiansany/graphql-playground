import createProductDataLoaders, {
  ProductDataLoaders,
} from "./product/dataloader";
import createProductRatingDataLoaders, {
  ProductRatingDataLoaders,
} from "./productRating/dataloader";
import createProductRatingCommentDataLoaders, {
  ProductRatingCommentDataLoaders,
} from "./productRatingComment/dataloader";

export default class DataLoaders {
  public Product: ProductDataLoaders;
  public ProductRating: ProductRatingDataLoaders;
  public ProductRatingComment: ProductRatingCommentDataLoaders;

  constructor() {
    this.Product = createProductDataLoaders();
    this.ProductRating = createProductRatingDataLoaders();
    this.ProductRatingComment = createProductRatingCommentDataLoaders();
  }
}
