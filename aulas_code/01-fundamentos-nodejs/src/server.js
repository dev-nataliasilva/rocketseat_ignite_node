//CommonJS => Padrão de importação usando o "require"
//const http = require('http')

//ESModules => import/export (novo padrão!)
import http from 'node:http' //node: antes das importações dos módulos internos

//Aplicações HTTP => Apis


//CRIANDO PRIMEIRO SERVIDOR HTTP

//Requisição HTTP
//  Composta de dois principais recursos
//      Método
//      URL
//  Vários métodos: GET, POST, PUT, PATCH, DELETE
//  Semanticamente são diferentes.
//  GET => Buscar recurso
//  POST => Criar uma recurso
//  PUT => Editar/Atualizar um recurso
//  PATCH => Atualizar uma informação específica de um recurso no back-end
//  DELETE => Deletar um recurso
//exemplo: Criar usuário (nome, email, ...)


//Stateful (sempre terá algum tipo de informação guardada em memória)
//Stateless (não salva nada em memória - salva geralmente em dispositivos externos como banco e dados)

//JSON - Javascript Object Notation

//Cabeçalhos (req/res) => Metadados
//  informações adicionais de como esse dado pode ser interpretado pelo back-end
//  ser enviados tanto do front quanto do back

//HTTP Status code


const users = []
                                //req e rest são streamings no final das contas, no NODE
const server = http.createServer((request, response) => {   //arrow function/função anônima
    const { method, url } = request
    console.log(method, url)

    if (method == 'GET' && url == '/users')
    {
        //Early return
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users)) //string, buffer, Unit8Array(array)
    }

    if (method == 'POST' && url == '/users')
    {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        })

        return response.writeHead(201).end('Criação de usuários')
    }

    return response.writeHead(404).end("Not found!")
})

server.listen(3333) //localhost:3333