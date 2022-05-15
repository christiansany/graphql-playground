import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const typesSubdomains = loadFilesSync(
  path.join(__dirname, "../subdomains/**/*.graphql"),
  { recursive: true }
);

export const typeDefs = mergeTypeDefs(typesSubdomains);
export const resolvers = loadFilesSync(
  [
    path.join(__dirname, "../subdomains/**/resolver.*"),
    path.join(__dirname, "../subdomains/**/resolvers.*"),
    path.join(__dirname, "../subdomains/**/*.resolver.*"),
    path.join(__dirname, "../subdomains/**/*.resolvers.*"),
  ],
  { extensions: [".js", ".ts"] }
);
