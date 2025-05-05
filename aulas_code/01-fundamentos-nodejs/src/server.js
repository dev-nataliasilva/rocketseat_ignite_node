import http from 'node:http'
import { json } from './middlewares/json.js'//Type module no package.json exige que eu especifique o tipo de arquivo
import { routes } from './routes.js'

// Query Parameters > URL Stateful enviar informações que não são sensíveis, que servem mais para modificar a resposta do backend [FILTROS, PAGINAÇÃO, ...]
// http://localhost:3333/users?userId=1&name=Diego     

// Route Parameters > Identificação de recurso
// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// Request Body > Envio de informações de um formulário (HTTPs). Diferente dos outros, NÃO ficam na URL.
// POST http://localhost:3333/users  

const server = http.createServer(async (request, response) => {
    const { method, url } = request
    
    await json(request, response)

 
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = request.url.match(route.path)

        console.log(routeParams)

        return route.handler(request, response)
    }

    return response.writeHead(404).end("Not found!")
})

server.listen(3333)