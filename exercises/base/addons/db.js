// Database V1 - No users
const fs = require('fs');
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const DB_PATH = './nodejs_introdb_v1'

const DEFAULT_STATE = [{
    '_id': '1e01ba13-ea47-4d24-9131-d95c23d1bb8f',
    'done': false,
    'value': 'Learn React'
  },{
    '_id': '076e0daf-e4ee-42af-8c3d-f6210920b0b7',
    'done': true,
    'value': 'Rake the yard'
  },{
    '_id': '5516fdbb-046a-4a4a-9085-36086b5ef00a',
    'done': false,
    'value': 'Buy milk'
  },{
    '_id': '385f6953-9658-4b3d-a791-afcd9460cb2b',
    'done': false,
    'value': 'Buy eggs'
  },{
    '_id': 'e8f3921b-157c-4ac5-b54c-24485048a9c1',
    'done': true,
    'value': 'Prepare next trip to south'
  }
]

let db

if (!fs.existsSync(DB_PATH)) {
  // Initialize DB
  db = new PouchDB(DB_PATH)
  console.log("[db.js] First time, initialize database with example data...")
  db.bulkDocs(DEFAULT_STATE).then(result => console.log(result))
} else {
  db = new PouchDB(DB_PATH)
}


/**
 * Fetch all tasks from database
 * @return     {Task[]}    Promise of array of tasks
 */
function allTasks() {
  // Return all tasks
  return db.allDocs({
    include_docs: true
  }).then(r => r.rows)
  .then(r => r.map(d => d.doc))
  .then(r => r.map(d => ({id: d._id, done: d.done, value: d.value})))
}

/**
 * Create Task into database
 * @param      {string}   id Tasks id
 * @param      {string}   value Tasks content
 * @param      {boolean}  done Flag if task is done/undone
 * @return     {Task} Promise of the just created task
 */
function createTask(id, value, done) {
  return db.put({_id: id, value: value, done: done})
  .then(r => ({id, value, done}))
}

/**
 * Delete Task from database by id
 * @param      {string}   id
 * @return     {string} Promise of the deleted id
 */
function deleteTask(id) {
  return db.get(id)
  .then(doc => db.remove(doc))
  .then(result => id)
}

/**
 * Get Task from database by id
 * @param      {string}   id
 * @return     {Task} Promise of the Task
 */
function getTask(id) {
  return db.get(id)
}

/**
 * Update Task from database
 * @param      {string}   id Tasks id
 * @param      {string}   value Tasks content
 * @param      {boolean}  done Flag if task is done/undone
 * @return     {Task} Promise of the just created task
 */
function updateTask(id, value, done) {
  return createTask(id, value, done)
}

module.exports = {
  allTasks,
  createTask,
  deleteTask,
  updateTask
}
