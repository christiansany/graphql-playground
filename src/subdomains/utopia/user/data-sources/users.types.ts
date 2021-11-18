import { ObjectId } from "mongodb";
import { Maybe, UserCreateResponse } from "@generation/generated";
import { SourceConnection } from "../../generic/types";

export interface UserDocument {
  _id: ObjectId;
  username: string;
  email: string;
  height: number;
}

export type SourceUserConnection = SourceConnection<UserDocument>;

export interface SourceUserCreateResponse
  extends Omit<UserCreateResponse, "user"> {
  user?: Maybe<UserDocument> | undefined;
}
