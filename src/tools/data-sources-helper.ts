import {
  QueryProductsArgs,
  QueryUsersArgs,
  Scalars,
} from "@generation/generated";
import {
  GraphQLCustomDataSources,
  GraphQLCustomResolversContext,
} from "src/server/types";

interface IdQueryArgs {
  id: Scalars["ID"];
}

export const dataSourcesHelpers = <
  T extends keyof GraphQLCustomDataSources,
  ByIdArgs extends IdQueryArgs,
  ByConnectionArgs = QueryUsersArgs | QueryProductsArgs
>(
  dataSource: keyof GraphQLCustomDataSources
) => ({
  getById: ((
    _: never,
    args: ByIdArgs,
    { dataSources: { [dataSource]: source } }: GraphQLCustomResolversContext
  ) => source.getById(args)) as GraphQLCustomDataSources[T]["getById"],
  getByConnection: ((
    _: never,
    args: ByConnectionArgs,
    { dataSources: { [dataSource]: source } }: GraphQLCustomResolversContext
  ) =>
    source.getByConnection(
      args
    )) as GraphQLCustomDataSources[T]["getByConnection"],
});
