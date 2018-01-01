import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type User = {
   __typename?: 'User';
  username: Scalars['String'];
  avatarUrl: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  publicEmail?: Maybe<Scalars['String']>;
  installationId?: Maybe<Scalars['Float']>;
};

export type Repository = {
   __typename?: 'Repository';
  id: Scalars['Float'];
  nodeId: Scalars['String'];
  name: Scalars['String'];
  fullName: Scalars['String'];
  private: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
};

export type Product = {
   __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  repositoryName: Scalars['String'];
  owner: User;
  developers?: Maybe<Array<User>>;
};

export type Feedback = {
   __typename?: 'Feedback';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  user: GihubUser;
  state: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Comment = {
   __typename?: 'Comment';
  id: Scalars['Int'];
  body: Scalars['String'];
  user: GihubUser;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type GihubUser = {
   __typename?: 'GihubUser';
  username: Scalars['String'];
  avatarUrl: Scalars['String'];
};

export type FeedbackInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  me: User;
  repositories: Array<Repository>;
  products?: Maybe<Array<Product>>;
  product: Product;
  feedbacks: Array<Feedback>;
  feedback: Feedback;
  comments: Array<Comment>;
};


export type QueryProductArgs = {
  productUrl: Scalars['String'];
};


export type QueryFeedbacksArgs = {
  productId: Scalars['String'];
  limit?: Maybe<Scalars['Float']>;
  offset: Scalars['Float'];
};


export type QueryFeedbackArgs = {
  productUrl: Scalars['String'];
  issueNumber: Scalars['Float'];
};


export type QueryCommentsArgs = {
  productUrl: Scalars['String'];
  issueNumber: Scalars['Float'];
  limit?: Maybe<Scalars['Float']>;
  offset: Scalars['Float'];
};

export type Mutation = {
   __typename?: 'Mutation';
  githubUserAuthenticate: Scalars['String'];
  githubAppAuthenticate: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createProduct: Product;
  createFeedback: Feedback;
};


export type MutationGithubUserAuthenticateArgs = {
  code: Scalars['String'];
};


export type MutationGithubAppAuthenticateArgs = {
  installationId: Scalars['Float'];
};


export type MutationCreateProductArgs = {
  productName: Scalars['String'];
  productUrl: Scalars['String'];
  repositoryName: Scalars['String'];
};


export type MutationCreateFeedbackArgs = {
  productId: Scalars['ID'];
  feedback: FeedbackInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  User: ResolverTypeWrapper<User>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Repository: ResolverTypeWrapper<Repository>,
  Product: ResolverTypeWrapper<Product>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Feedback: ResolverTypeWrapper<Feedback>,
  Comment: ResolverTypeWrapper<Comment>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  GihubUser: ResolverTypeWrapper<GihubUser>,
  FeedbackInput: FeedbackInput,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  User: User,
  Float: Scalars['Float'],
  Repository: Repository,
  Product: Product,
  ID: Scalars['ID'],
  Feedback: Feedback,
  Comment: Comment,
  Int: Scalars['Int'],
  GihubUser: GihubUser,
  FeedbackInput: FeedbackInput,
  Query: {},
  Mutation: {},
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  publicEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  installationId?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type RepositoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Repository'] = ResolversParentTypes['Repository']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  nodeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  repositoryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  developers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type FeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feedback'] = ResolversParentTypes['Feedback']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>,
  user?: Resolver<ResolversTypes['GihubUser'], ParentType, ContextType>,
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['GihubUser'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type GihubUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['GihubUser'] = ResolversParentTypes['GihubUser']> = ResolversObject<{
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  repositories?: Resolver<Array<ResolversTypes['Repository']>, ParentType, ContextType>,
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>,
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductArgs, 'productUrl'>>,
  feedbacks?: Resolver<Array<ResolversTypes['Feedback']>, ParentType, ContextType, RequireFields<QueryFeedbacksArgs, 'productId' | 'offset'>>,
  feedback?: Resolver<ResolversTypes['Feedback'], ParentType, ContextType, RequireFields<QueryFeedbackArgs, 'productUrl' | 'issueNumber'>>,
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'productUrl' | 'issueNumber' | 'offset'>>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  githubUserAuthenticate?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationGithubUserAuthenticateArgs, 'code'>>,
  githubAppAuthenticate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationGithubAppAuthenticateArgs, 'installationId'>>,
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'productName' | 'productUrl' | 'repositoryName'>>,
  createFeedback?: Resolver<ResolversTypes['Feedback'], ParentType, ContextType, RequireFields<MutationCreateFeedbackArgs, 'productId' | 'feedback'>>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  User?: UserResolvers<ContextType>,
  Repository?: RepositoryResolvers<ContextType>,
  Product?: ProductResolvers<ContextType>,
  Feedback?: FeedbackResolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  GihubUser?: GihubUserResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Upload?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
