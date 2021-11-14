import createProductDataLoaders, {
  ProductDataLoaders,
} from "./utopia/product/dataloader";
import createProductRatingDataLoaders, {
  ProductRatingDataLoaders,
} from "./utopia/productRating/dataloader";
import createProductRatingCommentDataLoaders, {
  ProductRatingCommentDataLoaders,
} from "./utopia/productRatingComment/dataloader";

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
