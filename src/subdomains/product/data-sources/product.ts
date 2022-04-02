import {
  ProductCreateInput,
  ProductSortKey,
  ProductUpdateInput,
  QueryProductsArgs,
} from "@generation/generated";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId, Collection } from "mongodb";
import {
  ProductDocument,
  SourceProductCreateResponse,
  SourceProductUpdateResponse,
  SourceProductConnection,
} from "./product.types";
import { createParseQueryFn } from "../../../tools/query";
import {
  createPaginatedMongoDBDataFn,
  ISortFieldConfigs,
} from "../../../tools/pagination";

const filter = createParseQueryFn<ProductDocument>({
  // When there is no field specified in the query, but only a search term is provided
  searchTermFields: ["name", "description"],
  searchFields: [
    { field: "name", type: "string" },
    { field: "description", type: "string" },
    { field: "price", type: "number" },
  ],
});

// TODO: Unify parser functions
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
  public async getById(
    id: ObjectId
  ): Promise<ProductDocument | null | undefined> {
    return this.findOneById(id);
  }

  public async getByConnection({
    first,
    after,
    last,
    before,
    query,
    sortKey = ProductSortKey.ID,
    reverse = false,
  }: QueryProductsArgs): Promise<SourceProductConnection> {
    const collection: Collection<ProductDocument> = this.collection;

    // TODO These can be moved to a better place too...
    if (!first && !last) {
      throw new Error("TODO: Errormessage -> !first && !last");
    } else if (first && before) {
      throw new Error("TODO: Errormessage -> first && before");
    } else if (last && after) {
      throw new Error("TODO: Errormessage -> last && after");
    }

    // TODO: Unify parser functions
    const fitlerQuery = filter(query);

    const connectionResponse = await createPaginatedMongoDBDataFn<
      ProductDocument,
      ProductSortKey
    >(
      collection,
      sortFieldConfigs
    )({
      first,
      after,
      last,
      before,
      query: fitlerQuery,
      sortKey,
      reverse,
    });

    return connectionResponse;
  }

  public async createProduct(
    input: ProductCreateInput
  ): Promise<SourceProductCreateResponse> {
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
  ): Promise<SourceProductUpdateResponse> {
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
