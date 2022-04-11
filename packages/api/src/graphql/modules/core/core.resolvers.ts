import { APIContext } from '../../context/graphql.context'
import { Resolvers } from '../../resolvers.generated'
import jwt from 'jsonwebtoken'
import { createSQS, getNameFromARN, getNameFromURL } from '../../../utils'

export const resolvers: Resolvers<APIContext> = {
  Query: {
    queue: async (parent, args, context, info) => {
      const sqs = createSQS(context.aws)
      const { QueueUrl } = await sqs
        .getQueueUrl({
          QueueName: args.name,
        })
        .promise()
      const queueAttributes = await sqs
        .getQueueAttributes({
          QueueUrl: QueueUrl!,
          AttributeNames: ['All'],
        })
        .promise()
      return {
        URL: QueueUrl,
        ARN: queueAttributes?.Attributes?.QueueArn,
        count: parseInt(queueAttributes?.Attributes?.ApproximateNumberOfMessages || '0'),
      }
    },
    queues: async (parent, args, context, info) => {
      const sqs = createSQS(context.aws)
      const queues = await sqs.listQueues().promise()
      const queuesAttributes = await Promise.all(
        (queues.QueueUrls ?? [])?.map((q) => {
          return sqs
            .getQueueAttributes({
              QueueUrl: q,
              AttributeNames: ['All'],
            })
            .promise()
        }),
      )
      return (queues.QueueUrls ?? []).map((q) => {
        const name = getNameFromURL(q)
        console.log(name)
        const attributes = queuesAttributes.find((qa) => name === getNameFromARN(qa.Attributes!.QueueArn!))
        return {
          URL: q,
          ARN: attributes?.Attributes?.QueueArn,
          count: parseInt(attributes?.Attributes?.ApproximateNumberOfMessages || '0'),
        }
      })
    },
    queueMessages: async (parent, args, context, info) => {
      const sqs = createSQS(context.aws)
      const { Messages } = await sqs
        .receiveMessage({
          QueueUrl: args.URL,
          VisibilityTimeout: 0,
          MaxNumberOfMessages: 10,
        })
        .promise()
      return (Messages ?? []).map((m) => ({
        id: m.MessageId,
        body: m.Body,
      }))
    },
  },
  Mutation: {
    connect: async (parent, args, context, info) => {
      try {
        const sqs = createSQS(args.aws)
        await sqs.listQueues().promise()
        return jwt.sign(args.aws, `${process.env.TOKEN_SECRET}`, {}) // never expire token
      } catch (e) {
        throw new Error('Unable to connect the the SQS queue.')
      }
    },
    createQueue: async (parent, args, context, info) => {
      const sqs = createSQS(context.aws)
      const { QueueUrl } = await sqs
        .createQueue({
          QueueName: args.name,
        })
        .promise()
      const queueAttributes = await sqs
        .getQueueAttributes({
          QueueUrl: QueueUrl!,
          AttributeNames: ['All'],
        })
        .promise()
      return {
        URL: QueueUrl,
        ARN: queueAttributes.Attributes?.QueueArn,
        count: parseInt(queueAttributes.Attributes?.ApproximateNumberOfMessages || '0'),
      }
    },
    sendMessage: async (parent, args, context, info) => {
      const sqs = createSQS(context.aws)
      const { MessageId } = await sqs
        .sendMessage({
          QueueUrl: args.URL,
          MessageBody: args.body,
        })
        .promise()
      return {
        id: MessageId,
        body: args.body,
      }
    },
  },
}
