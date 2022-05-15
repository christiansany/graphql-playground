import UsersAPI from "../subdomains/user/data-sources/user";
import DataLoaders from "../subdomains/dataLoaders";
import ProductsAPI from "../subdomains/product/data-sources/product";

export interface GraphQLCustomDataSources {
  User: UsersAPI;
  Product: ProductsAPI;
}

export interface GraphQLCustomContext {
  dataLoaders: DataLoaders;
}

export interface GraphQLCustomResolversContext extends GraphQLCustomContext {
  dataSources: GraphQLCustomDataSources;
}
