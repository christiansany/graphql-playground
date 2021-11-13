// Generated File. Do not change it manually!
// tslint:disable:no-any
import { GraphQLResolveInfo } from "graphql";
import { IContext } from "src/types";
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
};

export enum CommunityVoteType {
  UpVote = "UpVote",
  DownVote = "DownVote",
  AbusiveVote = "AbusiveVote",
}

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

export type GamificationInfo = Node & {
  id: Scalars["ID"];
  rank: Scalars["String"];
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
  Node & {
    comments: ProductRatingCommentConnection;
    cons?: Maybe<Array<Scalars["String"]>>;
    creator: User;
    creatorIsVerifiedBuyer: Scalars["Boolean"];
    id: Scalars["ID"];
    insertDate: Scalars["String"];
    lastActivityDate: Scalars["String"];
    product: Product;
    pros?: Maybe<Array<Scalars["String"]>>;
    ratingScore: Scalars["Int"];
    text?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    votesSummary: ProductRatingVotesSummary;
  };

export type ProductRatingCommentsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
};

export type ProductRatingComment = Contribution &
  Node & {
    creator: User;
    id: Scalars["ID"];
    insertDate: Scalars["String"];
    lastActivityDate: Scalars["String"];
    rating: ProductRating;
    text: Scalars["String"];
    votesSummary: ProductRatingCommentVotesSummary;
  };

export type ProductRatingCommentConnection = Connection & {
  edges: ProductRatingCommentEdge[];
  pageInfo: PageInfo;
};

export type ProductRatingCommentEdge = Edge & {
  cursor: Scalars["String"];
  node: ProductRatingComment;
};

export type ProductRatingCommentVotesSummary = VotesSummary & {
  upVoteCount: Scalars["Int"];
  downVoteCount: Scalars["Int"];
  abusiveVoteCount: Scalars["Int"];
  voteScore: Scalars["Int"];
  userVoteType?: Maybe<CommunityVoteType>;
};

export type ProductRatingConnection = Connection & {
  edges: ProductRatingEdge[];
  pageInfo: PageInfo;
};

export type ProductRatingEdge = Edge & {
  cursor: Scalars["String"];
  node: ProductRating;
};

export type ProductRatingVotesSummary = VotesSummary & {
  upVoteCount: Scalars["Int"];
  downVoteCount: Scalars["Int"];
  abusiveVoteCount: Scalars["Int"];
  voteScore: Scalars["Int"];
  userVoteType?: Maybe<CommunityVoteType>;
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
};

export type User = Node & {
  email: Scalars["String"];
  gamificationInfo: GamificationInfo;
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

export type UserEdge = Edge & {
  cursor: Scalars["String"];
  node: User;
};

export type UserError = DisplayableError & {
  field?: Maybe<Array<Scalars["String"]>>;
  message: Scalars["String"];
};

export type VotesSummary = {
  upVoteCount: Scalars["Int"];
  downVoteCount: Scalars["Int"];
  abusiveVoteCount: Scalars["Int"];
  voteScore: Scalars["Int"];
  userVoteType?: Maybe<CommunityVoteType>;
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
  CommunityVoteType: CommunityVoteType;
  Connection:
    | ResolversTypes["ProductConnection"]
    | ResolversTypes["ProductRatingCommentConnection"]
    | ResolversTypes["ProductRatingConnection"]
    | ResolversTypes["UserConnection"];
  Contribution:
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"];
  DisplayableError: ResolversTypes["UserError"];
  String: ResolverTypeWrapper<Scalars["String"]>;
  Edge:
    | ResolversTypes["ProductEdge"]
    | ResolversTypes["ProductRatingCommentEdge"]
    | ResolversTypes["ProductRatingEdge"]
    | ResolversTypes["UserEdge"];
  GamificationInfo: ResolverTypeWrapper<GamificationInfo>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Node:
    | ResolversTypes["GamificationInfo"]
    | ResolversTypes["Product"]
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"]
    | ResolversTypes["User"];
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
  ProductRatingCommentVotesSummary: ResolverTypeWrapper<ProductRatingCommentVotesSummary>;
  ProductRatingConnection: ResolverTypeWrapper<ProductRatingConnection>;
  ProductRatingEdge: ResolverTypeWrapper<ProductRatingEdge>;
  ProductRatingVotesSummary: ResolverTypeWrapper<ProductRatingVotesSummary>;
  ProductRatingsSummary: ResolverTypeWrapper<ProductRatingsSummary>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserError: ResolverTypeWrapper<UserError>;
  VotesSummary:
    | ResolversTypes["ProductRatingCommentVotesSummary"]
    | ResolversTypes["ProductRatingVotesSummary"];
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
  DisplayableError: ResolversParentTypes["UserError"];
  String: Scalars["String"];
  Edge:
    | ResolversParentTypes["ProductEdge"]
    | ResolversParentTypes["ProductRatingCommentEdge"]
    | ResolversParentTypes["ProductRatingEdge"]
    | ResolversParentTypes["UserEdge"];
  GamificationInfo: GamificationInfo;
  ID: Scalars["ID"];
  Node:
    | ResolversParentTypes["GamificationInfo"]
    | ResolversParentTypes["Product"]
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"]
    | ResolversParentTypes["User"];
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
  ProductRatingCommentVotesSummary: ProductRatingCommentVotesSummary;
  ProductRatingConnection: ProductRatingConnection;
  ProductRatingEdge: ProductRatingEdge;
  ProductRatingVotesSummary: ProductRatingVotesSummary;
  ProductRatingsSummary: ProductRatingsSummary;
  Float: Scalars["Float"];
  Query: {};
  User: User;
  UserConnection: UserConnection;
  UserEdge: UserEdge;
  UserError: UserError;
  VotesSummary:
    | ResolversParentTypes["ProductRatingCommentVotesSummary"]
    | ResolversParentTypes["ProductRatingVotesSummary"];
};

export type ConnectionResolvers<
  ContextType = IContext,
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
  ContextType = IContext,
  ParentType extends ResolversParentTypes["Contribution"] = ResolversParentTypes["Contribution"]
> = {
  __resolveType: TypeResolveFn<
    "ProductRating" | "ProductRatingComment",
    ParentType,
    ContextType
  >;
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export type DisplayableErrorResolvers<
  ContextType = IContext,
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
  ContextType = IContext,
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

export type GamificationInfoResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["GamificationInfo"] = ResolversParentTypes["GamificationInfo"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = {
  __resolveType: TypeResolveFn<
    | "GamificationInfo"
    | "Product"
    | "ProductRating"
    | "ProductRatingComment"
    | "User",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = IContext,
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
  ContextType = IContext,
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
  ContextType = IContext,
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
  ContextType = IContext,
  ParentType extends ResolversParentTypes["ProductEdge"] = ResolversParentTypes["ProductEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingResolvers<
  ContextType = IContext,
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
  insertDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["String"],
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
  votesSummary?: Resolver<
    ResolversTypes["ProductRatingVotesSummary"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingCommentResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["ProductRatingComment"] = ResolversParentTypes["ProductRatingComment"]
> = {
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  insertDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  rating?: Resolver<ResolversTypes["ProductRating"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  votesSummary?: Resolver<
    ResolversTypes["ProductRatingCommentVotesSummary"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingCommentConnectionResolvers<
  ContextType = IContext,
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
  ContextType = IContext,
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

export type ProductRatingCommentVotesSummaryResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["ProductRatingCommentVotesSummary"] = ResolversParentTypes["ProductRatingCommentVotesSummary"]
> = {
  upVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  downVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  abusiveVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  voteScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userVoteType?: Resolver<
    Maybe<ResolversTypes["CommunityVoteType"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingConnectionResolvers<
  ContextType = IContext,
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
  ContextType = IContext,
  ParentType extends ResolversParentTypes["ProductRatingEdge"] = ResolversParentTypes["ProductRatingEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["ProductRating"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingVotesSummaryResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["ProductRatingVotesSummary"] = ResolversParentTypes["ProductRatingVotesSummary"]
> = {
  upVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  downVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  abusiveVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  voteScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userVoteType?: Resolver<
    Maybe<ResolversTypes["CommunityVoteType"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductRatingsSummaryResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["ProductRatingsSummary"] = ResolversParentTypes["ProductRatingsSummary"]
> = {
  averageRating?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  totalRatings?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = IContext,
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
    RequireFields<QueryUsersArgs, never>
  >;
};

export type UserResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  gamificationInfo?: Resolver<
    ResolversTypes["GamificationInfo"],
    ParentType,
    ContextType
  >;
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
  ContextType = IContext,
  ParentType extends ResolversParentTypes["UserConnection"] = ResolversParentTypes["UserConnection"]
> = {
  edges?: Resolver<Array<ResolversTypes["UserEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["UserEdge"] = ResolversParentTypes["UserEdge"]
> = {
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<
  ContextType = IContext,
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

export type VotesSummaryResolvers<
  ContextType = IContext,
  ParentType extends ResolversParentTypes["VotesSummary"] = ResolversParentTypes["VotesSummary"]
> = {
  __resolveType: TypeResolveFn<
    "ProductRatingCommentVotesSummary" | "ProductRatingVotesSummary",
    ParentType,
    ContextType
  >;
  upVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  downVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  abusiveVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  voteScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userVoteType?: Resolver<
    Maybe<ResolversTypes["CommunityVoteType"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = IContext> = {
  Connection?: ConnectionResolvers<ContextType>;
  Contribution?: ContributionResolvers<ContextType>;
  DisplayableError?: DisplayableErrorResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  GamificationInfo?: GamificationInfoResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  ProductRating?: ProductRatingResolvers<ContextType>;
  ProductRatingComment?: ProductRatingCommentResolvers<ContextType>;
  ProductRatingCommentConnection?: ProductRatingCommentConnectionResolvers<ContextType>;
  ProductRatingCommentEdge?: ProductRatingCommentEdgeResolvers<ContextType>;
  ProductRatingCommentVotesSummary?: ProductRatingCommentVotesSummaryResolvers<ContextType>;
  ProductRatingConnection?: ProductRatingConnectionResolvers<ContextType>;
  ProductRatingEdge?: ProductRatingEdgeResolvers<ContextType>;
  ProductRatingVotesSummary?: ProductRatingVotesSummaryResolvers<ContextType>;
  ProductRatingsSummary?: ProductRatingsSummaryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  VotesSummary?: VotesSummaryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = IContext> = Resolvers<ContextType>;
