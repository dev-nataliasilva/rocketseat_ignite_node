import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed))) //primeiro parametro é erro
    }
}


//TUDO EM NODE SÃO STREAMS!
//req => ReadableStream
//res => WritableStream
const server = http.createServer(async (req, res) => {
    //e se eu quiser consumir uma stream completa?
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
n
    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    //         .pipe(new InverseNumberStream())
    //         .pipe(res)
})

server.listen(5555)