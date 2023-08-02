const { request, response } = require("express");
const express = require('express'); //= cria um servidor web e facilita a construção de rotas
const uuid = require('uuid'); //= indentificação unica para os users
const cors = require("cors"); //= permite o servidor responder requisições de diferentes lugares de acesso 
const port = 3001
const app = express()
app.use(express.json())
app.use(cors())


const users = []

const checkUserId = (request, response, next) => { // funcao para verificar se existe user com o id da requisição, se caso nao retorna error 404
   const { id } = request.params

   const index = users.findIndex(user => user.id === id)
   if (index < 0) {
      return response.status(404).json({ Message: "user not found" })
   }
   request.userIndex = index
   request.userId = id

   next()
}

app.get('/users', (request, response) => {

   console.log(users);
   return response.json(users)
})

app.post('/users', (request, response) => {
   const { name, age } = request.body
8 
   const user = { id: uuid.v4(), name, age }

   users.push(user)

   return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request, response) => {

   const { name, age } = request.body

   const index = request.userIndex
   const id = request.userId
   const updateUser = { id, name, age }

   users[index] = updateUser

   return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {

   const index = request.userIndex
console.log(index);
   users.splice(index, 1)

   return response.status(204).json(users)
})


app.listen(port, () => {
   console.log(`Starting server on port...${port} ;)`)
})