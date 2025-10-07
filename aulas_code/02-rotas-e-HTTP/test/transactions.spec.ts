import { expect, test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

test('user can create a new transaction', async () => {
    //Fazer a chamada HTTP para criar uma nova transação
    //validação

    const response = await request(app.server)
    .post('/transactions')
    .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
    })

    expect(response.statusCode).equal(201)
})