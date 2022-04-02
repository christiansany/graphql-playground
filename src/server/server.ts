import DataLoaders from "src/subdomains/dataLoaders";
import { resolvers, typeDefs } from "./schema";
import { ApolloServer } from "apollo-server";
import { MongoClient } from "mongodb";

import UsersAPI from "../subdomains/user/data-sources/users";
import ProductsAPI from "../subdomains/product/data-sources/product";

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xr1op.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect().then(async () => {
  // tslint:disable-next-line
  console.log(`🌿  Connected to Mongo Cluster`);

  // This should be moved to the the user data sources
  client.db().collection("users").createIndex({ _id: 1, height: 1 });
  client.db().collection("users").createIndex({ _id: 1, username: 1 });
  client.db().collection("users").createIndex({ email: 1 });

  // This should be moved to the products data sources
  client.db().collection("products").createIndex({ _id: 1, price: 1 });
  client.db().collection("products").createIndex({ _id: 1, name: 1 });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { dataLoaders: new DataLoaders() };
    },
    dataSources: () => ({
      users: new UsersAPI(client.db().collection("users")),
      products: new ProductsAPI(client.db().collection("products")),
    }),
  });

  server.listen().then(({ url }) => {
    // tslint:disable-next-line
    console.log(`🚀  Server ready at ${url}`);
  });
});
