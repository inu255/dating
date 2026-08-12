import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { DateTimeResolver } from 'graphql-scalars';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import { mocks, createStatefulResolvers } from './mocks/index.js';

const PORT = Number(process.env.PORT ?? 4000);

const schemaDir = join(dirname(fileURLToPath(import.meta.url)), 'schema');

const typeDefs = readdirSync(schemaDir)
  .filter((f) => f.endsWith('.graphql'))
  .sort()
  .map((f) => readFileSync(join(schemaDir, f), 'utf-8'))
  .join('\n');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    DateTime: DateTimeResolver,
    Query: {
      feed: (_parent, args: { first?: number | null }) => ({
        edges: Array.from({ length: args.first ?? 10 }, () => ({})),
      }),
    },
  },
});

const mockedSchema = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true,
  resolvers: (store) => createStatefulResolvers(store),
});

const server = new ApolloServer({ schema: mockedSchema });

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀 Mock GraphQL server: ${url}`);
console.log(`   Песочница (Apollo Sandbox) откроется по этому же адресу в браузере`);
