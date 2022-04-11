import { GraphQLSchema } from 'graphql'
import { createModule } from 'graphql-modules'
import buildAuthDirective from './auth/auth.directive'

const authDirective = buildAuthDirective('auth')

export default createModule({
  id: 'directives',
  dirname: __dirname,
  typeDefs: [authDirective.typeDefs],
})

export const applyDirectives = (schema: GraphQLSchema) => {
  return [authDirective].reduce((prev, curr) => curr.transform(prev), schema)
}
