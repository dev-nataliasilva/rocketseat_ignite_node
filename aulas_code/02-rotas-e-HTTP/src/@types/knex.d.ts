//definição de tipos
//não terá código javascript, apenas typescript
import { Knex } from 'knex'

declare module 'knex/type/tables' {
    export interface Tables {
        transactions: string
    }
}
