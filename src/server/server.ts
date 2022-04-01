import DataLoaders from "src/subdomains/dataLoaders";
import { resolvers, typeDefs } from "./schema";
import { ApolloServer } from "apollo-server";
import { MongoClient } from "mongodb";

import UsersAPI from "../subdomains/user/data-sources/users";

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xr1op.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect().then(() => {
  // tslint:disable-next-line
  console.log(`🌿  Connected to Mongo Cluster`);

  client.db().collection("users").createIndex({ _id: 1, height: 1 });
  client.db().collection("users").createIndex({ _id: 1, username: 1 });
  client.db().collection("users").createIndex({ email: 1 });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { dataLoaders: new DataLoaders() };
    },
    dataSources: () => ({
      users: new UsersAPI(client.db().collection("users")),
    }),
  });

  server.listen().then(({ url }) => {
    // tslint:disable-next-line
    console.log(`🚀  Server ready at ${url}`);
  });
});
