//Netflix & Spotify

//Streaming
//Ler pequenas partes de alguma coisa e já conseguir trabalhar com aqueles dados, mesmo antes de ler o arquivo completo

//Exemplo: Importação de clientes via CSV (Excel)
//1gb - 1.000.000
//POST/upload import.csv

//10mb/s - 100s
//100s -> inserções no banco de dados

//Já usando o streaming
//10mb/s -> nos primeiros 10mb já tenho cerca de 10.000 linhas
//já posso ir inserino no database antes de todo o arquivo subir

//Readable streams / Writable streams

//IMPORTANTE
//no Node, toda porta de entrada e saída é automaticamente uma stream

//Streams ->
//conectar essas streams
//stdin stdout
// process.stdin
//     .pipe(process.stdout) //pipe encaminhar para uma saída

import { Readable } from 'node:stream'
class OneToHundredStream extends Readable{
    index = 1
    
    _read(){
        const i = this.index++

        // if (i > 100){
        //     this.push(null)//?
        // } else{
        //     const buf = Buffer.from(String(i)) 

        //     this.push(buf)
        // }

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

new OneToHundredStream()
    .pipe(process.stdout)