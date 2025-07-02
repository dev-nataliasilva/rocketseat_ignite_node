import fastify from 'fastify';
import { transactionsRoutes } from './routes/transactions';

const app = fastify({ logger: true });

app.register(transactionsRoutes, {
  prefix: 'transactions',
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
});


//npx tsx src/server.ts
//npm run dev

//EcmaScript Lint >>

//Variaveis de ambiente