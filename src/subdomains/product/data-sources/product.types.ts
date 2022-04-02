import { ObjectId } from "mongodb";
import {
  Maybe,
  ProductCreateResponse,
  ProductUpdateResponse,
} from "@generation/generated";
import { SourceConnection } from "../../generic/types";

export interface ProductDocument {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
}

export type SourceProductConnection = SourceConnection<ProductDocument>;

export interface SourceProductCreateResponse
  extends Omit<ProductCreateResponse, "product"> {
  product?: Maybe<ProductDocument> | undefined;
}

export interface SourceProductUpdateResponse
  extends Omit<ProductUpdateResponse, "product"> {
  product?: Maybe<ProductDocument> | undefined;
}
