import { createModule } from 'graphql-modules'
import { resolvers } from './core.resolvers'
import { typeDefs } from './core.typedefs'

export default createModule({
  id: 'core',
  dirname: __dirname,
  typeDefs,
  resolvers,
})
