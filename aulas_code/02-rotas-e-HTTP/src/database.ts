import knexModule from 'knex'
import type { Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
  },
  useNullAsDefault: true,
}

export const knex = knexModule(config)
