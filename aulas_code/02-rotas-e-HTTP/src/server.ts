import { env } from './env'
import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'


const app = fastify()

app.get('/get', async () => {
    const transaction = await knex('transactions').select('*')

    return transaction
})

app.post('/insert', async () => {
    const transaction = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transação de teste',
        amount: 1000
    }).returning('*')

    return transaction
})

app.listen({
    port: env.PORT
}).then(() => {
    console.log('HTTP Server Running!')
})

//npx tsx src/server.ts
//npm run dev

//EcmaScript Lint >>

//Variaveis de ambiente