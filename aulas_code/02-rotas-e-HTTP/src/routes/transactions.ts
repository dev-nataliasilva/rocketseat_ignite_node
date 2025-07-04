import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { FastifyInstance } from 'fastify';

export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        //const body = createTransactionBodySchema.parse(request.body)
        const {title, amount, type} = createTransactionBodySchema.parse(request.body)

        await knex('transactions')
                .insert({
                    id: randomUUID(),
                    title: title,
                    amount: type === 'credit' ? amount : amount * -1 
                })

        return reply.status(201).send()
    })
}