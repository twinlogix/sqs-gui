import { createApplication, Module } from 'graphql-modules'
import { applyDirectives } from './graphql/modules/directives/directives.module'
import * as modules from './graphql/modules'
import { buildContext } from './graphql/context/graphql.context'
import { ApolloServer } from 'apollo-server'

const init = async () => {
  // SCHEMA
  const application = createApplication({
    modules: Object.values(modules) as Module[],
  })
  const schema = applyDirectives(application.createSchemaForApollo())

  // CONTEXT
  const context = buildContext()

  // APOLLO SERVER
  const server = new ApolloServer({
    schema,
    context,
  })
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}
init().catch((e) => console.error(e))
