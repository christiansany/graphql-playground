import {
  ProductCreateInput,
  ProductSortKey,
  ProductUpdateInput,
  QueryProductArgs,
  QueryProductsArgs,
} from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, Collection } from "mongodb";
import {
  ProductDocument,
  SourceProductCreatePayload,
  SourceProductUpdatePayload,
  SourceProductConnection,
} from "./product.types";
import { createParseQueryFn } from "../../../tools/query";
import {
  createPaginatedMongoDBDataFn,
  ISortFieldConfigs,
  validatePaginationArgs,
} from "../../../tools/pagination";

const createFilterQuery = createParseQueryFn<ProductDocument>({
  // When there is no field specified in the query, but only a search term is provided
  searchTermFields: ["name", "description"],
  searchFields: [
    { field: "name", type: "string" },
    { field: "description", type: "string" },
    { field: "price", type: "number" },
  ],
});

const sortFieldConfigs: ISortFieldConfigs<ProductDocument> = {
  [ProductSortKey.ID]: {
    field: "_id",
    parseValue: (value: string) => new ObjectId(value),
    unique: true,
  },
  [ProductSortKey.PRICE]: {
    field: "price",
    parseValue: (value: string) => Number(value),
  },
};

export default class ProductsAPI extends MongoDataSource<ProductDocument> {
  public async getById({
    id,
  }: QueryProductArgs): Promise<ProductDocument | null | undefined> {
    return this.findOneById(id);
  }

  public async getByConnection({
    query: rawQuery,
    sortKey = ProductSortKey.ID,
    reverse = false,
    ...paginationArgs
  }: QueryProductsArgs): Promise<SourceProductConnection> {
    validatePaginationArgs({ ...paginationArgs });

    // TODO: Unify parser functions
    const query = createFilterQuery(rawQuery);

    const connectionResponse = await createPaginatedMongoDBDataFn<
      ProductDocument,
      ProductSortKey
    >(
      this.collection,
      sortFieldConfigs
    )({
      ...paginationArgs,
      query,
      sortKey,
      reverse,
    });

    return connectionResponse;
  }

  public async createProduct(
    input: ProductCreateInput
  ): Promise<SourceProductCreatePayload> {
    const collection: Collection<ProductDocument> = this.collection;

    const doc = { ...input };
    const result = await collection.insertOne(doc);

    return {
      userErrors: [],
      product: {
        _id: result.insertedId,
        ...doc,
      },
    };
  }

  public async updateProduct(
    input: ProductUpdateInput
  ): Promise<SourceProductUpdatePayload> {
    const collection: Collection<ProductDocument> = this.collection;
    const { id, ...rest } = input;
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return {
        userErrors: [
          {
            message: "Product not found",
          },
        ],
      };
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...rest } }
    );

    return {
      userErrors: [],
      product: {
        ...product,
      },
    };
  }
}
