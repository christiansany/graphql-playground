import UsersAPI from "../subdomains/user/data-sources/users";
import DataLoaders from "../subdomains/dataLoaders";

export interface GraphQLCustomDataSources {
  users: UsersAPI;
}

export interface GraphQLCustomContext {
  dataLoaders: DataLoaders;
}

export interface GraphQLCustomResolversContext extends GraphQLCustomContext {
  dataSources: GraphQLCustomDataSources;
}
