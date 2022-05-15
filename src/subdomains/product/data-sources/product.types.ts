import { ObjectId } from "mongodb";
import {
  Maybe,
  ProductCreatePayload,
  ProductUpdatePayload,
} from "@generation/generated";
import { SourceConnection } from "../../generic/types";

export interface ProductDocument {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
}

export type SourceProductConnection = SourceConnection<ProductDocument>;

export interface SourceProductCreatePayload
  extends Omit<ProductCreatePayload, "product"> {
  product?: Maybe<ProductDocument> | undefined;
}

export interface SourceProductUpdatePayload
  extends Omit<ProductUpdatePayload, "product"> {
  product?: Maybe<ProductDocument> | undefined;
}
