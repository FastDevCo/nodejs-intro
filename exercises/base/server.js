const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8888

// MIDDLEWARE


// CORS is important when you have an API in one address1:port1 and a
// GUI in another address2:port2 that makes AJAX requests to your API.
// https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
// However, right now you just need to know that we have it enabled on every request :)
app.use(cors())


// bodyParser middleware reads the data in every request and parses it into a JS object
// we only support JSON so bodyParser.json() is sufficient.
app.use(bodyParser.json())


// CONSTANTS
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


// API

// this is how we add handlers for different API endpoints
app.get('/', (req, res) => {
  // handle a request
  res.json({text: 'This is the TODO API v1.0'})
})

// SERVER

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})


// exports for tests

module.exports = {
  app
}
