import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { AuthenticationError, gql } from 'apollo-server'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { APIContext } from '../../../context/graphql.context'

export default function buildAuthDirective(directiveName: string) {
  return {
    typeDefs: gql`directive @${directiveName}(isAuthenticated: Boolean = true, ) on FIELD_DEFINITION`,
    transform: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
          if (authDirective) {
            const { isAuthenticated } = authDirective
            if (isAuthenticated) {
              const { resolve = defaultFieldResolver } = fieldConfig
              fieldConfig.resolve = function (source, args, context: APIContext, info) {
                if (!context.aws) {
                  throw new AuthenticationError('Unauthenticated access is forbidden.')
                }
                return resolve(source, args, context, info)
              }
              return fieldConfig
            }
          }
        },
      }),
  }
}
