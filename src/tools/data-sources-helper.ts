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

// TODO: Fix types here, this is ugly and typing is loose
export const dataSourcesHelpers = <
  ByIdArgs extends IdQueryArgs,
  ByConnectionArgs = QueryUsersArgs | QueryProductsArgs
>(
  dataSource: keyof GraphQLCustomDataSources
) => ({
  getById: (
    _: never,
    args: ByIdArgs,
    { dataSources: { [dataSource]: source } }: GraphQLCustomResolversContext
  ) => source.getById(args),
  getByConnection: (
    _: never,
    args: ByConnectionArgs,
    { dataSources: { [dataSource]: source } }: GraphQLCustomResolversContext
  ) => source.getByConnection(args),
});
