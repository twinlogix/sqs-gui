import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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


export type MutationconnectArgs = {
  aws: AwsConnect;
};


export type MutationcreateQueueArgs = {
  name: Scalars['String'];
};


export type MutationsendMessageArgs = {
  URL: Scalars['String'];
  body: Scalars['String'];
};

export type Query = {
  queue?: Maybe<Queue>;
  queueMessages?: Maybe<Array<QueueMessage>>;
  queues?: Maybe<Array<Queue>>;
};


export type QueryqueueArgs = {
  name: Scalars['String'];
};


export type QueryqueueMessagesArgs = {
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

export type QueuesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueuesQuery = { queues?: Array<{ URL: string, ARN: string, count: number }> | null };

export type QueueQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type QueueQuery = { queue?: { URL: string, ARN: string, count: number } | null };

export type QueueMessagesQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type QueueMessagesQuery = { queueMessages?: Array<{ id: string, body: string }> | null };

export type ConnectMutationVariables = Exact<{
  aws: AwsConnect;
}>;


export type ConnectMutation = { connect: string };

export type SendMessageMutationVariables = Exact<{
  url: Scalars['String'];
  body: Scalars['String'];
}>;


export type SendMessageMutation = { sendMessage: { id: string } };


export const QueuesDocument = gql`
    query Queues {
  queues {
    URL
    ARN
    count
  }
}
    `;

/**
 * __useQueuesQuery__
 *
 * To run a query within a React component, call `useQueuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueuesQuery(baseOptions?: Apollo.QueryHookOptions<QueuesQuery, QueuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueuesQuery, QueuesQueryVariables>(QueuesDocument, options);
      }
export function useQueuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueuesQuery, QueuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueuesQuery, QueuesQueryVariables>(QueuesDocument, options);
        }
export type QueuesQueryHookResult = ReturnType<typeof useQueuesQuery>;
export type QueuesLazyQueryHookResult = ReturnType<typeof useQueuesLazyQuery>;
export type QueuesQueryResult = Apollo.QueryResult<QueuesQuery, QueuesQueryVariables>;
export const QueueDocument = gql`
    query Queue($name: String!) {
  queue(name: $name) {
    URL
    ARN
    count
  }
}
    `;

/**
 * __useQueueQuery__
 *
 * To run a query within a React component, call `useQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueueQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useQueueQuery(baseOptions: Apollo.QueryHookOptions<QueueQuery, QueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueueQuery, QueueQueryVariables>(QueueDocument, options);
      }
export function useQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueueQuery, QueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueueQuery, QueueQueryVariables>(QueueDocument, options);
        }
export type QueueQueryHookResult = ReturnType<typeof useQueueQuery>;
export type QueueLazyQueryHookResult = ReturnType<typeof useQueueLazyQuery>;
export type QueueQueryResult = Apollo.QueryResult<QueueQuery, QueueQueryVariables>;
export const QueueMessagesDocument = gql`
    query QueueMessages($url: String!) {
  queueMessages(URL: $url) {
    id
    body
  }
}
    `;

/**
 * __useQueueMessagesQuery__
 *
 * To run a query within a React component, call `useQueueMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueueMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueueMessagesQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useQueueMessagesQuery(baseOptions: Apollo.QueryHookOptions<QueueMessagesQuery, QueueMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueueMessagesQuery, QueueMessagesQueryVariables>(QueueMessagesDocument, options);
      }
export function useQueueMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueueMessagesQuery, QueueMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueueMessagesQuery, QueueMessagesQueryVariables>(QueueMessagesDocument, options);
        }
export type QueueMessagesQueryHookResult = ReturnType<typeof useQueueMessagesQuery>;
export type QueueMessagesLazyQueryHookResult = ReturnType<typeof useQueueMessagesLazyQuery>;
export type QueueMessagesQueryResult = Apollo.QueryResult<QueueMessagesQuery, QueueMessagesQueryVariables>;
export const ConnectDocument = gql`
    mutation Connect($aws: AwsConnect!) {
  connect(aws: $aws)
}
    `;
export type ConnectMutationFn = Apollo.MutationFunction<ConnectMutation, ConnectMutationVariables>;

/**
 * __useConnectMutation__
 *
 * To run a mutation, you first call `useConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectMutation, { data, loading, error }] = useConnectMutation({
 *   variables: {
 *      aws: // value for 'aws'
 *   },
 * });
 */
export function useConnectMutation(baseOptions?: Apollo.MutationHookOptions<ConnectMutation, ConnectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectMutation, ConnectMutationVariables>(ConnectDocument, options);
      }
export type ConnectMutationHookResult = ReturnType<typeof useConnectMutation>;
export type ConnectMutationResult = Apollo.MutationResult<ConnectMutation>;
export type ConnectMutationOptions = Apollo.BaseMutationOptions<ConnectMutation, ConnectMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($url: String!, $body: String!) {
  sendMessage(URL: $url, body: $body) {
    id
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      url: // value for 'url'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;