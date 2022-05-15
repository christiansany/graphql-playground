import { ObjectId } from "mongodb";
import {
  Maybe,
  UserCreatePayload,
  UserUpdatePayload,
} from "__generated__/schema.generated";
import { SourceConnection } from "../../generic/types";

export interface UserDocument {
  _id: ObjectId;
  username: string;
  email: string;
  height: number;
}

export type SourceUserConnection = SourceConnection<UserDocument>;

export interface SourceUserCreatePayload
  extends Omit<UserCreatePayload, "user"> {
  user?: Maybe<UserDocument> | undefined;
}

export interface SourceUserUpdatePayload
  extends Omit<UserUpdatePayload, "user"> {
  user?: Maybe<UserDocument> | undefined;
}
