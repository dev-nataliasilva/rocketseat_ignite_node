// definição de tipos
// não terá código javascript, apenas typescript
declare module 'knex/types/tables' {
  interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      type: 'credit' | 'debit'
    }
  }
}
