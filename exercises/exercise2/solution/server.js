const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {uuid, createToken, jwtCheck} = require('./lib')


const app = express()
const PORT = process.env.PORT || 8888

// Check out the docs from docs/db_version_2_docs/index.html
const db = require('./db')

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
const todoAPI = express.Router()

todoAPI.use('/api/todos', jwtCheck)

todoAPI.get('/api/todos', (req, res) => {
  db.allUserTasks(req.user.username)
  .then(tasks => {
    res.json(tasks)
  })
})

todoAPI.post('/api/todos', (req, res) => {
  db.createTask(req.user.username, uuid(), req.body.value, false)
  .then(task => {
    res.json(task)
  })
})

todoAPI.delete('/api/todos/:taskId', (req, res) => {
  const { taskId } = req.params
  // Lets check first if the user is owner of that Task
  db.isOwner(req.user.username, taskId)
  .then(owner => {
    if (owner) return db.deleteTask(taskId)
    return res.status(401).json({error: 'permission denied'})
  })
  .then(deletedTaskId => {
    res.json({})
  })
})

todoAPI.put('/api/todos/:taskId', (req, res) => {

  const username = req.user.username;
  db.getTask(req.param.taskId)
  .then(task => {
    // Lets check first if the user is owner of that Task
    if (task.owner !== username) return res.status(401).json({error: 'permission denied'})
    // Update Task
    const updatedTask = Object.assign(task, req.body)
    return db.updateTask(username, req.params.taskId, updatedTask.value, updateTask.done)
  })
  .then(updatedTask => {
    res.json(updatedTask)
  })

})


// AUTH API
const authAPI = express.Router()

authAPI.post('/api/auth/register', (req, res) => {
  const {username, password} = req.body

  // Check if user exists
  db.userExist(username)
  .then(usernameExists => {
    if (usernameExists) {
      // Nope!
      return res.status(400).json({error: 'username taken'})
    }
    // Create one...
    return db.createUser(username, password)
  }).then(user => {
    return res.status(201).json({token: createToken(user)})
  })
})

authAPI.post('/api/auth/login', (req, res) => {
  const {username, password} = req.body
  db.checkUserCredentials(username, password)
  .then(status => {
    if (status) {
      return res.json({token: createToken({username})})
    }
    return res.status(400).json({error: 'invalid username or password'})
  })
})

// SERVER

app.use(todoAPI)
app.use(authAPI)


// SERVER

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})


// exports for tests

module.exports = {
  app
}
