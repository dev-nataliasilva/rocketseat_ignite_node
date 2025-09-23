import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

//TESTES
//unitários: unidade da sua aplicação
//integração: comunicação entre duas ou mais unidades
//e2e - ponta a ponta: simulam um usuário operando na nossa aplicação
//  Front-end: abre a página de login, digite o texto ...
//  Back-end: chamadas http, websockets

//Pirâmide de testes: E2E (não dependem de nenhuma tecnologia ou arquitetura de software)


// Cookies -> formas de manter contexto entre requisições
//"plugin" / parte separada
// Context específico
export async function transactionsRoutes(app: FastifyInstance) {
  //handler global / todas as rotas desse plugin vão disparar
  // app.addHook('preHandler', async (request, reply) => {
  //   console.log(`[${request.method}] ${request.url}`)
  // })
  
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .select()
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({ session_id: sessionId, id })
        .first()

      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('sessionId', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

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

    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days - prazo limite para expirar
        // expires: new Date ('2025-01-01')
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_Id: sessionId,
    })

    return reply.status(201).send()
  })
}
