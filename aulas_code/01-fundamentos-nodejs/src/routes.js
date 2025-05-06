import { Database } from './database.js'
import { randomUUID } from 'node:crypto' //UUID = Unique Universal ID
import { buildingRoutePath } from './utils/build-route-path.js'
                                         //pesquisar: short id por curiosidade
const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildingRoutePath('/users'),
        handler: (req, res) => {
console.log(req.query)

            const users = database.select('users')
            
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildingRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email
            }
    
            database.insert('users', user)
    
            return res.writeHead(201).end('Criação de usuários')
       }
    },
    {
        method: 'PUT',
        path: buildingRoutePath('/users/:id'),              //: variável dinamico
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body
            database.update ('users', id, {
                name,
                email
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildingRoutePath('/users/:id'),              //: variável dinamico
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        }
    } 
]