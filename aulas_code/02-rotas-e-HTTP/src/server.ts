import { app } from './app'
import { env } from './env'

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})


// npx tsx src/server.ts
// npm run dev

// EcmaScript Lint >>

// Variaveis de ambiente
