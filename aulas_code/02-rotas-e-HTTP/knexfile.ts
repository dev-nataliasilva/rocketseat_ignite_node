import { config } from './src/database'

export default {
  ...config,
  migrations: {
    directory: './db/migrations',
  },
}
