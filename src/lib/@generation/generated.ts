// Generated File. Do not change it manually!
// tslint:disable:no-any
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { GraphQLCustomResolversContext } from "src/server/types";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  HTML: any;
};

export type Connection = {
  edges: Edge[];
  pageInfo: PageInfo;
};

export type Contribution = {
  creator: User;
};

export type DisplayableError = {
  field?: Maybe<Array<Scalars["String"]>>;
  message: Scalars["String"];
};

export type Edge = {
  cursor: Scalars["String"];
  node: Node;
};

export type Mutation = {
  userCreate?: Maybe<UserCreateResponse>;
  userUpdate?: Maybe<UserUpdateResponse>;
};

export type MutationUserCreateArgs = {
  input?: Maybe<UserCreateInput>;
};

export type MutationUserUpdateArgs = {
  input?: Maybe<UserUpdateInput>;
};

export type Node = {
  id: Scalars["ID"];
};

export type PageInfo = {
  hasPreviousPage: Scalars["Boolean"];
  hasNextPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Product = Node & {
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  productRatings: ProductRatingConnection;
  productRatingsSummary: ProductRatingsSummary;
};

export type ProductProductRatingsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type ProductConnection = Connection & {
  edges: ProductEdge[];
  pageInfo: PageInfo;
};

export type ProductEdge = Edge & {
  cursor: Scalars["String"];
  node: Product;
};

export type ProductRating = Contribution &
  Node &
  Timestamps &
  Votable & {
    comments: ProductRatingCommentConnection;
    cons?: Maybe<Array<Scalars["String"]>>;
    creator: User;
    creatorIsVerifiedBuyer: Scalars["Boolean"];
    id: Scalars["ID"];
    insertDate: Scalars["DateTime"];
    lastActivityDate: Scalars["DateTime"];
    product: Product;
    pros?: Maybe<Array<Scalars["String"]>>;
    ratingScore: Scalars["Int"];
    text?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    userVote?: Maybe<Vote>;
    votes: Vote[];
    votesSummary: VotesSummary;
  };

export type ProductRatingCommentsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type ProductRatingComment = Node &
  Timestamps &
  Votable &
  Contribution & {
    id: Scalars["ID"];
    text: Scalars["String"];
    rating: ProductRating;
    insertDate: Scalars["DateTime"];
    lastActivityDate: Scalars["DateTime"];
    votesSummary: VotesSummary;
    votes: Vote[];
    userVote?: Maybe<Vote>;
    creator: User;
  };

export type ProductRatingCommentConnection = Connection & {
  edges: ProductRatingCommentEdge[];
  pageInfo: PageInfo;
};

export type ProductRatingCommentEdge = Edge & {
  cursor: Scalars["String"];
  node: ProductRatingComment;
};

export type ProductRatingConnection = Connection & {
  edges: ProductRatingEdge[];
  pageInfo: PageInfo;
};

export type ProductRatingEdge = Edge & {
  cursor: Scalars["String"];
  node: ProductRating;
};

export type ProductRatingsSummary = {
  averageRating: Scalars["Float"];
  totalRatings: Scalars["Int"];
};

export type Query = {
  me?: Maybe<User>;
  product?: Maybe<Product>;
  productRating?: Maybe<ProductRating>;
  productRatingComment?: Maybe<ProductRatingComment>;
  productRatingComments: ProductRatingCommentConnection;
  productRatings: ProductRatingConnection;
  products: ProductConnection;
  user?: Maybe<User>;
  users: UserConnection;
};

export type QueryProductArgs = {
  id: Scalars["ID"];
};

export type QueryProductRatingArgs = {
  id: Scalars["ID"];
};

export type QueryProductRatingCommentArgs = {
  id: Scalars["ID"];
};

export type QueryProductRatingCommentsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type QueryProductRatingsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
};

export type QueryProductsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  sortKey?: Maybe<UserSortKey>;
  reverse?: Maybe<Scalars["Boolean"]>;
};

export type Timestamps = {
  insertDate: Scalars["DateTime"];
  lastActivityDate: Scalars["DateTime"];
};

export type User = Node & {
  email: Scalars["String"];
  height: Scalars["Int"];
  id: Scalars["ID"];
  productRatingComments: ProductRatingCommentConnection;
  productRatings: ProductRatingConnection;
  username: Scalars["String"];
};

export type UserProductRatingCommentsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type UserProductRatingsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type UserConnection = Connection & {
  edges: UserEdge[];
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  height: Scalars["Int"];
};

export type UserCreateResponse = {
  userErrors: UserError[];
  user?: Maybe<User>;
};

export type UserEdge = Edge & {
  cursor: Scalars["String"];
  node: User;
};

export type UserError = DisplayableError & {
  field?: Maybe<Array<Scalars["String"]>>;
  message: Scalars["String"];
};

export enum UserSortKey {
  ID = "ID",
  USERNAME = "USERNAME",
  EMAIL = "EMAIL",
  HEIGHT = "HEIGHT",
}

export type UserUpdateInput = {
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  height: Scalars["Int"];
};

export type UserUpdateResponse = {
  userErrors: UserError[];
  user?: Maybe<User>;
};

export type Votable = {
  votesSummary: VotesSummary;
  votes: Vote[];
  userVote?: Maybe<Vote>;
};

export type Vote = Timestamps & {
  id: Scalars["ID"];
  user: User;
  type: VoteType;
  insertDate: Scalars["DateTime"];
  lastActivityDate: Scalars["DateTime"];
};

export enum VoteType {
  UpVote = "UpVote",
  DownVote = "DownVote",
  AbusiveVote = "AbusiveVote",
}

export type VotesSummary = {
  voteScore: Scalars["Int"];
  upVoteCount: Scalars["Int"];
  downVoteCount: Scalars["Int"];
  abusiveVoteCount: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Connection:
    | ResolversTypes["ProductConnection"]
    | ResolversTypes["ProductRatingCommentConnection"]
    | ResolversTypes["ProductRatingConnection"]
    | ResolversTypes["UserConnection"];
  Contribution:
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"];
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  DisplayableError: ResolversTypes["UserError"];
  String: ResolverTypeWrapper<Scalars["String"]>;
  Edge:
    | ResolversTypes["ProductEdge"]
    | ResolversTypes["ProductRatingCommentEdge"]
    | ResolversTypes["ProductRatingEdge"]
    | ResolversTypes["UserEdge"];
  HTML: ResolverTypeWrapper<Scalars["HTML"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Node:
    | ResolversTypes["Product"]
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"]
    | ResolversTypes["User"];
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Product: ResolverTypeWrapper<Product>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  ProductConnection: ResolverTypeWrapper<ProductConnection>;
  ProductEdge: ResolverTypeWrapper<ProductEdge>;
  ProductRating: ResolverTypeWrapper<ProductRating>;
  ProductRatingComment: ResolverTypeWrapper<ProductRatingComment>;
  ProductRatingCommentConnection: ResolverTypeWrapper<ProductRatingCommentConnection>;
  ProductRatingCommentEdge: ResolverTypeWrapper<ProductRatingCommentEdge>;
  ProductRatingConnection: ResolverTypeWrapper<ProductRatingConnection>;
  ProductRatingEdge: ResolverTypeWrapper<ProductRatingEdge>;
  ProductRatingsSummary: ResolverTypeWrapper<ProductRatingsSummary>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Query: ResolverTypeWrapper<{}>;
  Timestamps:
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"]
    | ResolversTypes["Vote"];
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserCreateInput: UserCreateInput;
  UserCreateResponse: ResolverTypeWrapper<UserCreateResponse>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserError: ResolverTypeWrapper<UserError>;
  UserSortKey: UserSortKey;
  UserUpdateInput: UserUpdateInput;
  UserUpdateResponse: ResolverTypeWrapper<UserUpdateResponse>;
  Votable:
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"];
  Vote: ResolverTypeWrapper<Vote>;
  VoteType: VoteType;
  VotesSummary: ResolverTypeWrapper<VotesSummary>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Connection:
    | ResolversParentTypes["ProductConnection"]
    | ResolversParentTypes["ProductRatingCommentConnection"]
    | ResolversParentTypes["ProductRatingConnection"]
    | ResolversParentTypes["UserConnection"];
  Contribution:
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"];
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  DisplayableError: ResolversParentTypes["UserError"];
  String: Scalars["String"];
  Edge:
    | ResolversParentTypes["ProductEdge"]
    | ResolversParentTypes["ProductRatingCommentEdge"]
    | ResolversParentTypes["ProductRatingEdge"]
    | ResolversParentTypes["UserEdge"];
  HTML: Scalars["HTML"];
  Mutation: {};
  Node:
    | ResolversParentTypes["Product"]
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"]
    | ResolversParentTypes["User"];
  ID: Scalars["ID"];
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Product: Product;
  Int: Scalars["Int"];
  ProductConnection: ProductConnection;
  ProductEdge: ProductEdge;
  ProductRating: ProductRating;
  ProductRatingComment: ProductRatingComment;
  ProductRatingCommentConnection: ProductRatingCommentConnection;
  ProductRatingCommentEdge: ProductRatingCommentEdge;
  ProductRatingConnection: ProductRatingConnection;
  ProductRatingEdge: ProductRatingEdge;
  ProductRatingsSummary: ProductRatingsSummary;
  Float: Scalars["Float"];
  Query: {};
  Timestamps:
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"]
    | ResolversParentTypes["Vote"];
  User: User;
  UserConnection: UserConnection;
  UserCreateInput: UserCreateInput;
  UserCreateResponse: UserCreateResponse;
  UserEdge: UserEdge;
  UserError: UserError;
  UserUpdateInput: UserUpdateInput;
  UserUpdateResponse: UserUpdateResponse;
  Votable:
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"];
  Vote: Vote;
  VotesSummary: VotesSummary;
};

export type ConnectionResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = {
  __resolveType: TypeResolveFn<
    | "ProductConnection"
    | "ProductRatingCommentConnection"
    | "ProductRatingConnection"
    | "UserConnection",
    ParentType,
    ContextType
  >;
  edges?: Resolver<Array<ResolversTypes["Edge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
};

export type ContributionResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Contribution"] = ResolversParentTypes["Contribution"]
> = {
  __resolveType: TypeResolveFn<
    "ProductRating" | "ProductRatingComment",
    ParentType,
    ContextType
  >;
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type DisplayableErrorResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["DisplayableError"] = ResolversParentTypes["DisplayableError"]
> = {
  __resolveType: TypeResolveFn<"UserError", ParentType, ContextType>;
  field?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type EdgeResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Edge"] = ResolversParentTypes["Edge"]
> = {
  __resolveType: TypeResolveFn<
    | "ProductEdge"
    | "ProductRatingCommentEdge"
    | "ProductRatingEdge"
    | "UserEdge",
    ParentType,
    ContextType
  >;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Node"], ParentType, ContextType>;
};

export interface HtmlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HTML"], any> {
  name: "HTML";
}

export type MutationResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  userCreate?: Resolver<
    Maybe<ResolversTypes["UserCreateResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUserCreateArgs, never>
  >;
  userUpdate?: Resolver<
    Maybe<ResolversTypes["UserUpdateResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUserUpdateArgs, never>
  >;
};

export type NodeResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<
    "Product" | "ProductRating" | "ProductRatingComment" | "User",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Product"] = ResolversParentTypes["Product"]
> = {
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  productRatings?: Resolver<
    ResolversTypes["ProductRatingConnection"],
    ParentType,
    ContextType,
    RequireFields<ProductProductRatingsArgs, never>
  >;
  productRatingsSummary?: Resolver<
    ResolversTypes["ProductRatingsSummary"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductConnectionResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductConnection"] = ResolversParentTypes["ProductConnection"]
> = {
  edges?: Resolver<
    Array<ResolversTypes["ProductEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductEdgeResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductEdge"] = ResolversParentTypes["ProductEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRating"] = ResolversParentTypes["ProductRating"]
> = {
  comments?: Resolver<
    ResolversTypes["ProductRatingCommentConnection"],
    ParentType,
    ContextType,
    RequireFields<ProductRatingCommentsArgs, never>
  >;
  cons?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  creatorIsVerifiedBuyer?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  insertDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  product?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  pros?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  ratingScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  userVote?: Resolver<Maybe<ResolversTypes["Vote"]>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes["Vote"]>, ParentType, ContextType>;
  votesSummary?: Resolver<
    ResolversTypes["VotesSummary"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingCommentResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRatingComment"] = ResolversParentTypes["ProductRatingComment"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["ProductRating"], ParentType, ContextType>;
  insertDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  votesSummary?: Resolver<
    ResolversTypes["VotesSummary"],
    ParentType,
    ContextType
  >;
  votes?: Resolver<Array<ResolversTypes["Vote"]>, ParentType, ContextType>;
  userVote?: Resolver<Maybe<ResolversTypes["Vote"]>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingCommentConnectionResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRatingCommentConnection"] = ResolversParentTypes["ProductRatingCommentConnection"]
> = {
  edges?: Resolver<
    Array<ResolversTypes["ProductRatingCommentEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingCommentEdgeResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRatingCommentEdge"] = ResolversParentTypes["ProductRatingCommentEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes["ProductRatingComment"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingConnectionResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRatingConnection"] = ResolversParentTypes["ProductRatingConnection"]
> = {
  edges?: Resolver<
    Array<ResolversTypes["ProductRatingEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingEdgeResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRatingEdge"] = ResolversParentTypes["ProductRatingEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["ProductRating"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingsSummaryResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductRatingsSummary"] = ResolversParentTypes["ProductRatingsSummary"]
> = {
  averageRating?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  totalRatings?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  product?: Resolver<
    Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProductArgs, "id">
  >;
  productRating?: Resolver<
    Maybe<ResolversTypes["ProductRating"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProductRatingArgs, "id">
  >;
  productRatingComment?: Resolver<
    Maybe<ResolversTypes["ProductRatingComment"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProductRatingCommentArgs, "id">
  >;
  productRatingComments?: Resolver<
    ResolversTypes["ProductRatingCommentConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryProductRatingCommentsArgs, never>
  >;
  productRatings?: Resolver<
    ResolversTypes["ProductRatingConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryProductRatingsArgs, never>
  >;
  products?: Resolver<
    ResolversTypes["ProductConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryProductsArgs, never>
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  users?: Resolver<
    ResolversTypes["UserConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, "sortKey" | "reverse">
  >;
};

export type TimestampsResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Timestamps"] = ResolversParentTypes["Timestamps"]
> = {
  __resolveType: TypeResolveFn<
    "ProductRating" | "ProductRatingComment" | "Vote",
    ParentType,
    ContextType
  >;
  insertDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  productRatingComments?: Resolver<
    ResolversTypes["ProductRatingCommentConnection"],
    ParentType,
    ContextType,
    RequireFields<UserProductRatingCommentsArgs, never>
  >;
  productRatings?: Resolver<
    ResolversTypes["ProductRatingConnection"],
    ParentType,
    ContextType,
    RequireFields<UserProductRatingsArgs, never>
  >;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserConnection"] = ResolversParentTypes["UserConnection"]
> = {
  edges?: Resolver<Array<ResolversTypes["UserEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCreateResponseResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserCreateResponse"] = ResolversParentTypes["UserCreateResponse"]
> = {
  userErrors?: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserEdge"] = ResolversParentTypes["UserEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserError"] = ResolversParentTypes["UserError"]
> = {
  field?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUpdateResponseResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserUpdateResponse"] = ResolversParentTypes["UserUpdateResponse"]
> = {
  userErrors?: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotableResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Votable"] = ResolversParentTypes["Votable"]
> = {
  __resolveType: TypeResolveFn<
    "ProductRating" | "ProductRatingComment",
    ParentType,
    ContextType
  >;
  votesSummary?: Resolver<
    ResolversTypes["VotesSummary"],
    ParentType,
    ContextType
  >;
  votes?: Resolver<Array<ResolversTypes["Vote"]>, ParentType, ContextType>;
  userVote?: Resolver<Maybe<ResolversTypes["Vote"]>, ParentType, ContextType>;
};

export type VoteResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Vote"] = ResolversParentTypes["Vote"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["VoteType"], ParentType, ContextType>;
  insertDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotesSummaryResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["VotesSummary"] = ResolversParentTypes["VotesSummary"]
> = {
  voteScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  upVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  downVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  abusiveVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLCustomResolversContext> = {
  Connection?: ConnectionResolvers<ContextType>;
  Contribution?: ContributionResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DisplayableError?: DisplayableErrorResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  HTML?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  ProductRating?: ProductRatingResolvers<ContextType>;
  ProductRatingComment?: ProductRatingCommentResolvers<ContextType>;
  ProductRatingCommentConnection?: ProductRatingCommentConnectionResolvers<ContextType>;
  ProductRatingCommentEdge?: ProductRatingCommentEdgeResolvers<ContextType>;
  ProductRatingConnection?: ProductRatingConnectionResolvers<ContextType>;
  ProductRatingEdge?: ProductRatingEdgeResolvers<ContextType>;
  ProductRatingsSummary?: ProductRatingsSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamps?: TimestampsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserCreateResponse?: UserCreateResponseResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserUpdateResponse?: UserUpdateResponseResolvers<ContextType>;
  Votable?: VotableResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  VotesSummary?: VotesSummaryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<
  ContextType = GraphQLCustomResolversContext
> = Resolvers<ContextType>;
