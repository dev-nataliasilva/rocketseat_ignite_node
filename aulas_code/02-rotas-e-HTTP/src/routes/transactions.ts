import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

// Cookies -> formas de manter contexto entre requisições

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  // ao criar a primeira transação, será anotado um session_id nos cookies
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId)
    {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',      
        maxAge: 60 * 60 * 24 * 7, //7 days - prazo limite para expirar
        // expires: new Date ('2025-01-01')
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_Id: sessionId
    })

    return reply.status(201).send()
  })
}
