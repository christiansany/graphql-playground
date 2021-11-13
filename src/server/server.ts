import DataLoaders from "src/subdomains/dataLoaders";
import { resolvers, typeDefs } from "./schema";
import { ApolloServer } from "apollo-server";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { dataLoaders: new DataLoaders() };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
