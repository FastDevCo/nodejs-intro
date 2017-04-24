const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {uuid, createToken, jwtCheck} = require('./lib')

const app = express()

const PORT = process.env.PORT || 8888
const AUTH = (process.env.AUTH || false) == 'true' ? true : false

// WIP warning: these actually mutate due to TODO_DB reduce just
// reorganising the references and the tests abuse that...
const DEFAULT_STATE = [{
    'id': '1e01ba13-ea47-4d24-9131-d95c23d1bb8f',
    'done': false,
    'value': 'Learn React'
  },{
    'id': '076e0daf-e4ee-42af-8c3d-f6210920b0b7',
    'done': true,
    'value': 'Rake the yard'
  },{
    'id': '5516fdbb-046a-4a4a-9085-36086b5ef00a',
    'done': false,
    'value': 'Buy milk'
  },{
    'id': '385f6953-9658-4b3d-a791-afcd9460cb2b',
    'done': false,
    'value': 'Buy eggs'
  },{
    'id': 'e8f3921b-157c-4ac5-b54c-24485048a9c1',
    'done': true,
    'value': 'Prepare next trip to south'
  }
]

// "high performance in memory database"
let TODO_DB = DEFAULT_STATE.reduce((acc, val) => Object.assign(acc, {[val.id]: val}), {})
let USER_DB = {}

// MIDDLEWARE

app.use(cors())
app.use(bodyParser.json())

// API

app.get('/', (req, res) => {
  res.send('This is the TODO API v1.0')
})

// TODO API

const todoAPI = express.Router()

// use auth if enabled
if (AUTH) todoAPI.use('/api/todos', jwtCheck)

todoAPI.get('/api/todos', (req, res) => {
  res.json(Object.keys(TODO_DB).map(key => TODO_DB[key]))
})

todoAPI.post('/api/todos', (req, res) => {
  const task = {id: uuid(), done: false, value: req.body.value}
  TODO_DB[task.id] = task
  res.json(task)
})

todoAPI.delete('/api/todos/:taskId', (req, res) => {
  const taskId = req.params.taskId
  delete TODO_DB[taskId]
  res.json({})
})

todoAPI.put('/api/todos/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const updatedTask = Object.assign(TODO_DB[taskId], req.body)
  TODO_DB[taskId] = updatedTask
  res.json(updatedTask)
})


// AUTH API

const authAPI = express.Router()
authAPI.post('/api/auth/register', (req, res) => {
  const {username, password} = req.body
  if (USER_DB[username]) return res.status(400).json({error: 'username taken'})
  USER_DB[username] = {username, password}
  res.json({token: createToken({username})})
})

authAPI.post('/api/auth/login', (req, res) => {
  const {username, password} = req.body
  const user = USER_DB[username]
  if (user && user.password == password) res.json({token: createToken({username})})
  else res.status(400).json({error: 'invalid username or password'})
})

// SERVER

app.use(todoAPI)
app.use(authAPI)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
  console.log(`AUTH: ${AUTH}`)
})

module.exports = {
  app,
  DEFAULT_STATE,
  USER_DB
}
