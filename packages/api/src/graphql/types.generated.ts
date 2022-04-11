export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AwsConnect = {
  credentials: AwsCredentials;
  endpoint?: InputMaybe<Scalars['String']>;
  region: Scalars['String'];
};

export type AwsCredentials = {
  accessKeyId: Scalars['String'];
  secretAccessKey: Scalars['String'];
};

export type Mutation = {
  connect: Scalars['String'];
  createQueue: Queue;
  sendMessage: QueueMessage;
};


export type MutationConnectArgs = {
  aws: AwsConnect;
};


export type MutationCreateQueueArgs = {
  name: Scalars['String'];
};


export type MutationSendMessageArgs = {
  URL: Scalars['String'];
  body: Scalars['String'];
};

export type Query = {
  queue?: Maybe<Queue>;
  queueMessages?: Maybe<Array<QueueMessage>>;
  queues?: Maybe<Array<Queue>>;
};


export type QueryQueueArgs = {
  name: Scalars['String'];
};


export type QueryQueueMessagesArgs = {
  URL: Scalars['String'];
};

export type Queue = {
  ARN: Scalars['String'];
  URL: Scalars['String'];
  count: Scalars['Int'];
};

export type QueueMessage = {
  body: Scalars['String'];
  id: Scalars['String'];
};
