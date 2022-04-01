import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
  ValueNode,
} from "graphql";

const scalarDateConfig: GraphQLScalarTypeConfig<Date, number> = {
  name: "Date",
  description: "Date custom scalar type",
  // serialize(value: Date): number {
  //   return value.getTime(); // Convert outgoing Date to integer for JSON
  // },
  // parseValue(value: number): Date {
  //   return new Date(value); // Convert incoming integer to Date
  // },
  // parseLiteral(ast: ValueNode): Date | null {
  //   if (ast.kind === Kind.INT) {
  //     return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
  //   }
  //   return null; // Invalid hard-coded value (not an integer)
  // },
};

const scalarDate = new GraphQLScalarType(scalarDateConfig);

const scalarDateTimeConfig: GraphQLScalarTypeConfig<string, string> = {
  name: "DateTime",
  description: "DateTime custom scalar type",
  // serialize(value: string): string {
  //   return new Date(value).toISOString();
  // },
  // parseValue(value: string): string {
  //   return new Date(value).toISOString();
  // },
  // parseLiteral(ast: ValueNode): string | null {
  //   if (ast.kind === Kind.STRING) {
  //     return new Date(ast.value).toISOString();
  //   }
  //   return null; // Invalid hard-coded value (not an integer)
  // },
};

const scalarDateTime = new GraphQLScalarType(scalarDateTimeConfig);

const scalarHTMLConfig: GraphQLScalarTypeConfig<string, string> = {
  name: "HTML",
  description: "HTML custom scalar type",
};

const scalarHTML = new GraphQLScalarType(scalarHTMLConfig);

export default {
  Date: scalarDate,
  DateTime: scalarDateTime,
  HTML: scalarHTML,
};
