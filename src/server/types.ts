import UsersAPI from "../subdomains/user/data-sources/users";
import DataLoaders from "../subdomains/dataLoaders";
import ProductsAPI from "../subdomains/product/data-sources/product";

export interface GraphQLCustomDataSources {
  users: UsersAPI;
  products: ProductsAPI;
}

export interface GraphQLCustomContext {
  dataLoaders: DataLoaders;
}

export interface GraphQLCustomResolversContext extends GraphQLCustomContext {
  dataSources: GraphQLCustomDataSources;
}
