import { Readable } from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1
    
    _read(){
        const i = this.index++
        setTimeout(() => {
             if (i > 5){
                this.push(null)//?
            } else{
                const buf = Buffer.from(String(i)) 
    
                this.push(buf)
            }
        }, 1000)
    }
}

//Fetch api > api completa pra trabalhar com req e res na web
fetch('http://localhost:5555', {
    method: 'POST',  
    body: new OneToHundredStream(),
    duplex: 'half' // IMPORTANTE! no comentário da aula tem sobre a questão de versão
}).then(response => {
    return response.text()
}).then(data => {
        console.log(data)
})