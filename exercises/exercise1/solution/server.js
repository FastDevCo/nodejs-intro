const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const {uuid} = require('./lib')
const app = express()
const PORT = process.env.PORT || 8888

// Check out the docs from docs/db_version_1_docs/index.html
const db = require('./addons/db')

// MIDDLEWARE


// CORS is important when you have an API in one address1:port1 and a
// GUI in another address2:port2 that makes AJAX requests to your API.
// https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
// However, right now you just need to know that we have it enabled on every request :)
app.use(cors())


// bodyParser middleware reads the data in every request and parses it into a JS object
// we only support JSON so bodyParser.json() is sufficient.
app.use(bodyParser.json())


// API

// this is how we add handlers for different API endpoints
app.get('/', (req, res) => {
  // handle a request
  res.json({text: 'This is the TODO API v1.0'})
})

// TODO API

app.get('/api/todos', (req, res) => {
  db.allTasks()
  .then(tasks => {
    res.json(tasks)
  })
})

app.post('/api/todos', (req, res) => {
  db.createTask(uuid(), req.body.value, false)
  .then(task => {
    res.json(task)
  })
})

app.delete('/api/todos/:taskId', (req, res) => {
  db.deleteTask(req.params.taskId)
  .then(deletedTaskId => {
    res.json({})
  })
})

app.put('/api/todos/:taskId', (req, res) => {

  db.updateTask(req.params.taskId, req.body)
  .then(updatedTask => {
    res.json(updatedTask)
  })

})


// SERVER

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})


// exports for tests

module.exports = {
  app,
  db
}
