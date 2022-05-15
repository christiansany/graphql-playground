// Generated File. Do not change it manually!
// tslint:disable:no-any

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { UserDocument } from "src/subdomains/user/data-sources/user.types";
import { ProductDocument } from "src/subdomains/product/data-sources/product.types";
import { GraphQLCustomResolversContext } from "src/server/types";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

/**
 * Returns a Connection, in accordance with
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-Connection-Types).
 */
export type Connection = {
  /** A list of edges. */
  edges: Edge[];
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type Contribution = {
  creator: User;
};

export type DisplayableError = {
  field?: Maybe<Array<Scalars["String"]>>;
  message: Scalars["String"];
};

/** A generic interface which holds one Edge and a cursor during pagination. */
export type Edge = {
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item implementing the node interface. */
  node: Node;
};

export type Mutation = {
  productCreate?: Maybe<ProductCreatePayload>;
  productUpdate?: Maybe<ProductUpdatePayload>;
  userCreate?: Maybe<UserCreatePayload>;
  userUpdate?: Maybe<UserUpdatePayload>;
};

export type MutationProductCreateArgs = {
  input: ProductCreateInput;
};

export type MutationProductUpdateArgs = {
  input: ProductUpdateInput;
};

export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};

/**
 * An object with an ID field to support global identification, in accordance with the [Relay
 * specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 */
export type Node = {
  /** A globally-unique identifier. */
  id: Scalars["ID"];
};

/**
 * Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 */
export type PageInfo = {
  /** The cursor corresponding to the last node in edges. */
  endCursor?: Maybe<Scalars["String"]>;
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars["Boolean"];
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: Scalars["Boolean"];
  /** The cursor corresponding to the first node in edges. */
  startCursor?: Maybe<Scalars["String"]>;
};

export type Product = Node & {
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["Float"];
  productRatings: ProductRatingConnection;
  productRatingsSummary: ProductRatingsSummary;
};

export type ProductProductRatingsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type ProductConnection = Connection & {
  edges: ProductEdge[];
  pageInfo: PageInfo;
};

export type ProductCreateInput = {
  description: Scalars["String"];
  name: Scalars["String"];
  price: Scalars["Int"];
};

export type ProductCreatePayload = {
  product?: Maybe<Product>;
  userErrors: UserError[];
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
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type ProductRatingComment = Contribution &
  Node &
  Timestamps &
  Votable & {
    creator: User;
    id: Scalars["ID"];
    insertDate: Scalars["DateTime"];
    lastActivityDate: Scalars["DateTime"];
    rating: ProductRating;
    text: Scalars["String"];
    userVote?: Maybe<Vote>;
    votes: Vote[];
    votesSummary: VotesSummary;
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

export enum ProductSortKey {
  ID = "ID",
  PRICE = "PRICE",
}

export type ProductUpdateInput = {
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
};

export type ProductUpdatePayload = {
  product?: Maybe<Product>;
  userErrors: UserError[];
};

export type Query = {
  me?: Maybe<User>;
  node?: Maybe<Node>;
  nodes: Node[];
  product?: Maybe<Product>;
  productRating?: Maybe<ProductRating>;
  productRatingComment?: Maybe<ProductRatingComment>;
  productRatingComments: ProductRatingCommentConnection;
  productRatings: ProductRatingConnection;
  products: ProductConnection;
  user?: Maybe<User>;
  users: UserConnection;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]>;
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
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryProductRatingsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  query?: Maybe<Scalars["String"]>;
};

export type QueryProductsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  query?: Maybe<Scalars["String"]>;
  reverse?: Scalars["Boolean"];
  sortKey?: ProductSortKey;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  query?: Maybe<Scalars["String"]>;
  reverse?: Scalars["Boolean"];
  sortKey?: UserSortKey;
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
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type UserProductRatingsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type UserConnection = Connection & {
  edges: UserEdge[];
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  email: Scalars["String"];
  height: Scalars["Int"];
  username: Scalars["String"];
};

export type UserCreatePayload = {
  user?: Maybe<User>;
  userErrors: UserError[];
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
  EMAIL = "EMAIL",
  HEIGHT = "HEIGHT",
  ID = "ID",
  USERNAME = "USERNAME",
}

export type UserUpdateInput = {
  email?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  username?: Maybe<Scalars["String"]>;
};

export type UserUpdatePayload = {
  user?: Maybe<User>;
  userErrors: UserError[];
};

export type Votable = {
  userVote?: Maybe<Vote>;
  votes: Vote[];
  votesSummary: VotesSummary;
};

export type Vote = Timestamps & {
  id: Scalars["ID"];
  insertDate: Scalars["DateTime"];
  lastActivityDate: Scalars["DateTime"];
  type: VoteType;
  user: User;
};

export type VotesSummary = {
  abusiveVoteCount: Scalars["Int"];
  downVoteCount: Scalars["Int"];
  upVoteCount: Scalars["Int"];
  voteScore: Scalars["Int"];
};

export enum VoteType {
  AbusiveVote = "AbusiveVote",
  DownVote = "DownVote",
  UpVote = "UpVote",
}

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
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
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
  Edge:
    | ResolversTypes["ProductEdge"]
    | ResolversTypes["ProductRatingCommentEdge"]
    | ResolversTypes["ProductRatingEdge"]
    | ResolversTypes["UserEdge"];
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  HTML: ResolverTypeWrapper<Scalars["HTML"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Node:
    | ResolversTypes["Product"]
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"]
    | ResolversTypes["User"];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Product: ResolverTypeWrapper<ProductDocument>;
  ProductConnection: ResolverTypeWrapper<
    Omit<ProductConnection, "edges"> & {
      edges: Array<ResolversTypes["ProductEdge"]>;
    }
  >;
  ProductCreateInput: ProductCreateInput;
  ProductCreatePayload: ResolverTypeWrapper<
    Omit<ProductCreatePayload, "product"> & {
      product?: Maybe<ResolversTypes["Product"]>;
    }
  >;
  ProductEdge: ResolverTypeWrapper<
    Omit<ProductEdge, "node"> & { node: ResolversTypes["Product"] }
  >;
  ProductRating: ResolverTypeWrapper<
    Omit<
      ProductRating,
      "comments" | "creator" | "product" | "userVote" | "votes"
    > & {
      comments: ResolversTypes["ProductRatingCommentConnection"];
      creator: ResolversTypes["User"];
      product: ResolversTypes["Product"];
      userVote?: Maybe<ResolversTypes["Vote"]>;
      votes: Array<ResolversTypes["Vote"]>;
    }
  >;
  ProductRatingComment: ResolverTypeWrapper<
    Omit<ProductRatingComment, "creator" | "rating" | "userVote" | "votes"> & {
      creator: ResolversTypes["User"];
      rating: ResolversTypes["ProductRating"];
      userVote?: Maybe<ResolversTypes["Vote"]>;
      votes: Array<ResolversTypes["Vote"]>;
    }
  >;
  ProductRatingCommentConnection: ResolverTypeWrapper<
    Omit<ProductRatingCommentConnection, "edges"> & {
      edges: Array<ResolversTypes["ProductRatingCommentEdge"]>;
    }
  >;
  ProductRatingCommentEdge: ResolverTypeWrapper<
    Omit<ProductRatingCommentEdge, "node"> & {
      node: ResolversTypes["ProductRatingComment"];
    }
  >;
  ProductRatingConnection: ResolverTypeWrapper<
    Omit<ProductRatingConnection, "edges"> & {
      edges: Array<ResolversTypes["ProductRatingEdge"]>;
    }
  >;
  ProductRatingEdge: ResolverTypeWrapper<
    Omit<ProductRatingEdge, "node"> & { node: ResolversTypes["ProductRating"] }
  >;
  ProductRatingsSummary: ResolverTypeWrapper<ProductRatingsSummary>;
  ProductSortKey: ProductSortKey;
  ProductUpdateInput: ProductUpdateInput;
  ProductUpdatePayload: ResolverTypeWrapper<
    Omit<ProductUpdatePayload, "product"> & {
      product?: Maybe<ResolversTypes["Product"]>;
    }
  >;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Timestamps:
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"]
    | ResolversTypes["Vote"];
  User: ResolverTypeWrapper<UserDocument>;
  UserConnection: ResolverTypeWrapper<
    Omit<UserConnection, "edges"> & { edges: Array<ResolversTypes["UserEdge"]> }
  >;
  UserCreateInput: UserCreateInput;
  UserCreatePayload: ResolverTypeWrapper<
    Omit<UserCreatePayload, "user"> & { user?: Maybe<ResolversTypes["User"]> }
  >;
  UserEdge: ResolverTypeWrapper<
    Omit<UserEdge, "node"> & { node: ResolversTypes["User"] }
  >;
  UserError: ResolverTypeWrapper<UserError>;
  UserSortKey: UserSortKey;
  UserUpdateInput: UserUpdateInput;
  UserUpdatePayload: ResolverTypeWrapper<
    Omit<UserUpdatePayload, "user"> & { user?: Maybe<ResolversTypes["User"]> }
  >;
  Votable:
    | ResolversTypes["ProductRating"]
    | ResolversTypes["ProductRatingComment"];
  Vote: ResolverTypeWrapper<
    Omit<Vote, "user"> & { user: ResolversTypes["User"] }
  >;
  VotesSummary: ResolverTypeWrapper<VotesSummary>;
  VoteType: VoteType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
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
  Edge:
    | ResolversParentTypes["ProductEdge"]
    | ResolversParentTypes["ProductRatingCommentEdge"]
    | ResolversParentTypes["ProductRatingEdge"]
    | ResolversParentTypes["UserEdge"];
  Float: Scalars["Float"];
  HTML: Scalars["HTML"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Mutation: {};
  Node:
    | ResolversParentTypes["Product"]
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"]
    | ResolversParentTypes["User"];
  PageInfo: PageInfo;
  Product: ProductDocument;
  ProductConnection: Omit<ProductConnection, "edges"> & {
    edges: Array<ResolversParentTypes["ProductEdge"]>;
  };
  ProductCreateInput: ProductCreateInput;
  ProductCreatePayload: Omit<ProductCreatePayload, "product"> & {
    product?: Maybe<ResolversParentTypes["Product"]>;
  };
  ProductEdge: Omit<ProductEdge, "node"> & {
    node: ResolversParentTypes["Product"];
  };
  ProductRating: Omit<
    ProductRating,
    "comments" | "creator" | "product" | "userVote" | "votes"
  > & {
    comments: ResolversParentTypes["ProductRatingCommentConnection"];
    creator: ResolversParentTypes["User"];
    product: ResolversParentTypes["Product"];
    userVote?: Maybe<ResolversParentTypes["Vote"]>;
    votes: Array<ResolversParentTypes["Vote"]>;
  };
  ProductRatingComment: Omit<
    ProductRatingComment,
    "creator" | "rating" | "userVote" | "votes"
  > & {
    creator: ResolversParentTypes["User"];
    rating: ResolversParentTypes["ProductRating"];
    userVote?: Maybe<ResolversParentTypes["Vote"]>;
    votes: Array<ResolversParentTypes["Vote"]>;
  };
  ProductRatingCommentConnection: Omit<
    ProductRatingCommentConnection,
    "edges"
  > & { edges: Array<ResolversParentTypes["ProductRatingCommentEdge"]> };
  ProductRatingCommentEdge: Omit<ProductRatingCommentEdge, "node"> & {
    node: ResolversParentTypes["ProductRatingComment"];
  };
  ProductRatingConnection: Omit<ProductRatingConnection, "edges"> & {
    edges: Array<ResolversParentTypes["ProductRatingEdge"]>;
  };
  ProductRatingEdge: Omit<ProductRatingEdge, "node"> & {
    node: ResolversParentTypes["ProductRating"];
  };
  ProductRatingsSummary: ProductRatingsSummary;
  ProductUpdateInput: ProductUpdateInput;
  ProductUpdatePayload: Omit<ProductUpdatePayload, "product"> & {
    product?: Maybe<ResolversParentTypes["Product"]>;
  };
  Query: {};
  String: Scalars["String"];
  Timestamps:
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"]
    | ResolversParentTypes["Vote"];
  User: UserDocument;
  UserConnection: Omit<UserConnection, "edges"> & {
    edges: Array<ResolversParentTypes["UserEdge"]>;
  };
  UserCreateInput: UserCreateInput;
  UserCreatePayload: Omit<UserCreatePayload, "user"> & {
    user?: Maybe<ResolversParentTypes["User"]>;
  };
  UserEdge: Omit<UserEdge, "node"> & { node: ResolversParentTypes["User"] };
  UserError: UserError;
  UserUpdateInput: UserUpdateInput;
  UserUpdatePayload: Omit<UserUpdatePayload, "user"> & {
    user?: Maybe<ResolversParentTypes["User"]>;
  };
  Votable:
    | ResolversParentTypes["ProductRating"]
    | ResolversParentTypes["ProductRatingComment"];
  Vote: Omit<Vote, "user"> & { user: ResolversParentTypes["User"] };
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
  productCreate?: Resolver<
    Maybe<ResolversTypes["ProductCreatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationProductCreateArgs, "input">
  >;
  productUpdate?: Resolver<
    Maybe<ResolversTypes["ProductUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationProductUpdateArgs, "input">
  >;
  userCreate?: Resolver<
    Maybe<ResolversTypes["UserCreatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUserCreateArgs, "input">
  >;
  userUpdate?: Resolver<
    Maybe<ResolversTypes["UserUpdatePayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUserUpdateArgs, "input">
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
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
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
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
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

export type ProductCreatePayloadResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductCreatePayload"] = ResolversParentTypes["ProductCreatePayload"]
> = {
  product?: Resolver<Maybe<ResolversTypes["Product"]>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
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
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  insertDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  rating?: Resolver<ResolversTypes["ProductRating"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userVote?: Resolver<Maybe<ResolversTypes["Vote"]>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes["Vote"]>, ParentType, ContextType>;
  votesSummary?: Resolver<
    ResolversTypes["VotesSummary"],
    ParentType,
    ContextType
  >;
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

export type ProductUpdatePayloadResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["ProductUpdatePayload"] = ResolversParentTypes["ProductUpdatePayload"]
> = {
  product?: Resolver<Maybe<ResolversTypes["Product"]>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  node?: Resolver<
    Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<QueryNodeArgs, "id">
  >;
  nodes?: Resolver<
    Array<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<QueryNodesArgs, "ids">
  >;
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
    RequireFields<QueryProductsArgs, "reverse" | "sortKey">
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
    RequireFields<QueryUsersArgs, "reverse" | "sortKey">
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

export type UserCreatePayloadResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserCreatePayload"] = ResolversParentTypes["UserCreatePayload"]
> = {
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
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

export type UserUpdatePayloadResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["UserUpdatePayload"] = ResolversParentTypes["UserUpdatePayload"]
> = {
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userErrors?: Resolver<
    Array<ResolversTypes["UserError"]>,
    ParentType,
    ContextType
  >;
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
  userVote?: Resolver<Maybe<ResolversTypes["Vote"]>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes["Vote"]>, ParentType, ContextType>;
  votesSummary?: Resolver<
    ResolversTypes["VotesSummary"],
    ParentType,
    ContextType
  >;
};

export type VoteResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["Vote"] = ResolversParentTypes["Vote"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  insertDate?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastActivityDate?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["VoteType"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotesSummaryResolvers<
  ContextType = GraphQLCustomResolversContext,
  ParentType extends ResolversParentTypes["VotesSummary"] = ResolversParentTypes["VotesSummary"]
> = {
  abusiveVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  downVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  upVoteCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  voteScore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
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
  ProductCreatePayload?: ProductCreatePayloadResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  ProductRating?: ProductRatingResolvers<ContextType>;
  ProductRatingComment?: ProductRatingCommentResolvers<ContextType>;
  ProductRatingCommentConnection?: ProductRatingCommentConnectionResolvers<ContextType>;
  ProductRatingCommentEdge?: ProductRatingCommentEdgeResolvers<ContextType>;
  ProductRatingConnection?: ProductRatingConnectionResolvers<ContextType>;
  ProductRatingEdge?: ProductRatingEdgeResolvers<ContextType>;
  ProductRatingsSummary?: ProductRatingsSummaryResolvers<ContextType>;
  ProductUpdatePayload?: ProductUpdatePayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamps?: TimestampsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserCreatePayload?: UserCreatePayloadResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserUpdatePayload?: UserUpdatePayloadResolvers<ContextType>;
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
