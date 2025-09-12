// eslint-disable-next-line
import knex, { Knex } from 'knex'

export const setupKnex = knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
})
