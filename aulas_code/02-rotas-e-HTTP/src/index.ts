//type or Interface
interface User 
{
    birthYear: number
}

function calculateAgeofUser (user : User)
{
    return new Date().getFullYear() - user.birthYear
}

calculateAgeofUser({
    birthYear: 1994
})
//npm i - D typescript
//npx tsc --init
//tsconfig.json alterar o target (basicamente versão do js)
//npx tsc src/index.ts converte para js