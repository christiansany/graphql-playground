import { parseGID } from "src/tools/gid";
import { Resolvers } from "__generated__/schema.generated";
import { ProductDocument } from "../product/data-sources/product.types";
import { UserDocument } from "../user/data-sources/user.types";

// TODO: All Node types need a dataloader and this should be enforced
const resolvers: Resolvers = {
  Query: {
    node: (_, { id: gid }, { dataSources }) => {
      const { typename, id } = parseGID(gid);
      // TODO: Make this typesave
      return dataSources[typename].getById({ id });
    },
    nodes: (_, { ids: gids }, { dataSources }) =>
      gids.map((gid) => {
        const { typename, id } = parseGID(gid);
        // TODO: Make this typesave
        return dataSources[typename].getById({ id });
      }),
  },
  Node: {
    __resolveType: (source) => {
      // TODO When the gid is already put on the Model inside datasource we can use it to resolve the type without any issues
      if ((source as UserDocument).username) {
        return "User";
      } else if (
        (source as ProductDocument).name &&
        (source as ProductDocument).description
      ) {
        return "Product";
      }
      throw new Error("Interface could not be resolved in __resolveType"); // TODO: Add specific apollo error
    },
  },
};

export default resolvers;
