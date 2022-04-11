import { ExpressContext } from 'apollo-server-express'
import { PubSub, PubSubEngine } from 'graphql-subscriptions'
import { AwsConnect } from '../types.generated'
import { validateToken } from './security.context'

export type APIContext = {
  pubSub: PubSubEngine
  aws?: AwsConnect
}

export const buildContext = () => {
  return async (expressContext: ExpressContext): Promise<APIContext> => {
    const authHeader = expressContext?.req?.headers?.authorization
    let aws
    if (authHeader) {
      aws = validateToken(authHeader.replace('Bearer ', ''))
    }
    return {
      pubSub: new PubSub(),
      aws,
    }
  }
}
