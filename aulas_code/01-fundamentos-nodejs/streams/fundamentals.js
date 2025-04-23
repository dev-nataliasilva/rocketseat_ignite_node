import { Readable, Writable, Transform } from  'node:stream'

class OneToHundredStream extends Readable{
    index = 1
    
    _read(){
        const i = this.index++
        setTimeout(() => {
             if (i > 100){
                this.push(null)//?
            } else{
                const buf = Buffer.from(String(i)) 
    
                this.push(buf)
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
            //chunk - pedaço da stream
            //encoding - como essa stream está codificada
            //callback - quando ela terminou de fazer o que precisava fazer
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

//TransformStreams > para transformar um dado/chuck em outro
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed))) //primeiro parametro é erro
    }
}

//Estou lendo parte por parte e já consigo trabalhar com pedaços
new OneToHundredStream()                //Lê dados
    .pipe(new InverseNumberStream())    //Transforma dados
    .pipe(new MultiplyByTenStream())    //Escreve dados

  