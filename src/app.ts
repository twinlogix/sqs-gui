#!/usr/bin/env node
import { createApplication, Module } from 'graphql-modules'
import { applyDirectives } from './graphql/modules/directives/directives.module'
import * as modules from './graphql/modules'
import { buildContext } from './graphql/context/graphql.context'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import path from 'path'
import http from 'http'
import open from 'open'

const app = express()

app.use('/', express.static(path.resolve(__dirname, '../../web/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../web/build', 'index.html'))
})

const startGraphQLServer = async () => {
  const httpServer = http.createServer(app)
  httpServer.listen(process.env.PORT || 4100)

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
  await server.start()
  server.applyMiddleware({ app })
}
startGraphQLServer()
  .then(() => {
    open(`http://localhost:${process.env.PORT || 4100}/connect`)
  })
  .catch((e) => console.error(e))
