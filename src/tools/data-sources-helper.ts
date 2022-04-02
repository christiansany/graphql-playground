import {
  QueryProductsArgs,
  QueryUsersArgs,
  Scalars,
} from "@generation/generated";
import { ObjectId } from "mongodb";
import {
  GraphQLCustomDataSources,
  GraphQLCustomResolversContext,
} from "src/server/types";

interface IdQueryArgs {
  id: Scalars["ID"];
}

// TODO: Fix the extends here
export const dataSourcesHelpers = <
  ByIdArgs extends IdQueryArgs,
  ByConnectionArgs = QueryUsersArgs | QueryProductsArgs
>(
  dataSource: keyof GraphQLCustomDataSources
) => ({
  getById: (
    _: never,
    { id }: ByIdArgs,
    { dataSources: { [dataSource]: source } }: GraphQLCustomResolversContext
  ) => source.getById(new ObjectId(id)),
  getByConnection: (
    _: never,
    connection: ByConnectionArgs,
    { dataSources: { [dataSource]: source } }: GraphQLCustomResolversContext
  ) => source.getByConnection(connection),
});
