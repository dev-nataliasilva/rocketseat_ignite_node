// { "users":[...] }
import fs from 'node:fs/promises'  //fs/promise usa as novas funcionalidades, enquanto o outro utiliza o mais "antigo" callback

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }
    
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
         // let == let it change
        let data = this.#database[table] ?? []

       
        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)            
        }else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data
    }

    update (table, id, data) {
        const rowIndex = this.#database[table].findIndex(x => x.id == id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data}
            this.#persist()
        }  
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(x => x.id == id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }  
    }
}