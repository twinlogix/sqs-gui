import { PartialDeep } from 'type-fest'
import * as types from './types.generated'
import { GraphQLResolveInfo } from 'graphql';
import { APIContext } from './context/graphql.context';
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };


export type ResolverTypeWrapper<T> = PartialDeep<T>;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => types.Maybe<TTypes> | Promise<types.Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AwsConnect: types.AwsConnect;
  AwsCredentials: types.AwsCredentials;
  Boolean: ResolverTypeWrapper<types.Scalars['Boolean']>;
  Int: ResolverTypeWrapper<types.Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Queue: ResolverTypeWrapper<types.Queue>;
  QueueMessage: ResolverTypeWrapper<types.QueueMessage>;
  String: ResolverTypeWrapper<types.Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AwsConnect: types.AwsConnect;
  AwsCredentials: types.AwsCredentials;
  Boolean: types.Scalars['Boolean'];
  Int: types.Scalars['Int'];
  Mutation: {};
  Query: {};
  Queue: types.Queue;
  QueueMessage: types.QueueMessage;
  String: types.Scalars['String'];
};

export type MutationResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  connect?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<types.MutationConnectArgs, 'aws'>>;
  createQueue?: Resolver<ResolversTypes['Queue'], ParentType, ContextType, RequireFields<types.MutationCreateQueueArgs, 'name'>>;
  sendMessage?: Resolver<ResolversTypes['QueueMessage'], ParentType, ContextType, RequireFields<types.MutationSendMessageArgs, 'URL' | 'body'>>;
};

export type QueryResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  queue?: Resolver<types.Maybe<ResolversTypes['Queue']>, ParentType, ContextType, RequireFields<types.QueryQueueArgs, 'name'>>;
  queueMessages?: Resolver<types.Maybe<Array<ResolversTypes['QueueMessage']>>, ParentType, ContextType, RequireFields<types.QueryQueueMessagesArgs, 'URL'>>;
  queues?: Resolver<types.Maybe<Array<ResolversTypes['Queue']>>, ParentType, ContextType>;
};

export type QueueResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Queue'] = ResolversParentTypes['Queue']> = {
  ARN?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  URL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueueMessageResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['QueueMessage'] = ResolversParentTypes['QueueMessage']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = APIContext> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Queue?: QueueResolvers<ContextType>;
  QueueMessage?: QueueMessageResolvers<ContextType>;
};

