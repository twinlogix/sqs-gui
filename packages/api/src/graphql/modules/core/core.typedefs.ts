import { gql } from 'apollo-server'

export const typeDefs = gql`
  input AwsCredentials {
    accessKeyId: String!
    secretAccessKey: String!
  }

  input AwsConnect {
    credentials: AwsCredentials!
    region: String!
    endpoint: String
  }

  type Queue {
    URL: String!
    ARN: String!
    count: Int!
  }

  type QueueMessage {
    id: String!
    body: String!
  }

  type Query {
    queue(name: String!): Queue @auth
    queues: [Queue!] @auth
    queueMessages(URL: String!): [QueueMessage!] @auth
  }

  type Mutation {
    connect(aws: AwsConnect!): String!
    createQueue(name: String!): Queue! @auth
    sendMessage(URL: String!, body: String!): QueueMessage! @auth
  }
`
