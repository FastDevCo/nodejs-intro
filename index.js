const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {uuid} = require('./lib')

const app = express()

const PORT = process.env.PORT || 8888;

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


let TODO_DATA = DEFAULT_STATE.reduce((acc, val) => Object.assign(acc, {[val.id]: val}), {})


// MIDDLEWARE

app.use(cors())
app.use(bodyParser.json())

// API

app.get('/', (req, res) => {
  res.send('This is the TODO API v1.0')
})

app.get('/api/todos', (req, res) => {
  res.json(Object.keys(TODO_DATA).map(key => TODO_DATA[key]))
})

app.post('/api/todos', (req, res) => {
  const task = {id: uuid(), done: false, value: req.body.task};
  TODO_DATA[task.id] = task;
  res.json(task);
})

app.delete('/api/todos/:taskId', (req, res) => {
  const taskId = req.params.taskId
  delete TODO_DATA[taskId]
  res.json({})
})

app.put('/api/todos/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = Object.assign(TODO_DATA[taskId], req.body.task)
  TODO_DATA[taskId] = updatedTask
  res.json(updatedTask)
})

// SERVER

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
