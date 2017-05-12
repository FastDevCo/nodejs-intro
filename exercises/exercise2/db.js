// Database V2 - Owners
const fs = require('fs');
const PouchDB = require('pouchdb')
const bcrypt = require('bcrypt-nodejs')
PouchDB.plugin(require('pouchdb-find'))
const DB_PATH = './nodejs_introdb_v2'

const DEFAULT_STATE = []

let db

function initDB(DB_PATH) {
  db = new PouchDB(DB_PATH)
  db.createIndex({
    index: {fields: ['owner']}
  });
  return db
}

if (!fs.existsSync(DB_PATH)) {
  // Initialize DB
  db = initDB(DB_PATH)
  console.log("[db.js] First time, initialize database with example data...")
  db.bulkDocs(DEFAULT_STATE).then(result => console.log(result))
} else {
  db = initDB(DB_PATH)
}


/**
 * Fetch all tasks from database
 * @param      {string}   user User to select the tasks
 * @return     {Task[]}    Promise of array of tasks
 */
function allUserTasks(user) {
  // Return all tasks
  return db.find({
    selector: {owner: user}
  })
  .then(r => r.docs)
  .then(r => r.map(d => ({id: d._id, owner: d.owner, done: d.done, value: d.value})))
}

/**
 * Create Task into database
 * @param      {string}   owner Owner of task
 * @param      {string}   id Tasks id
 * @param      {string}   value Tasks content
 * @param      {boolean}  done Flag if task is done/undone
 * @return     {Task} Promise of the just created task
 */
function createTask(owner, id, value, done) {
  return db.put({_id: id, owner: owner, value: value, done: done})
  .then(r => ({id, owner, value, done}))
}

/**
 * Is this user owner of the Task
 * @param      {string}   owner Owner of task
 * @param      {string}   id Tasks id
 * @return     {Boolean}  Promise true/false of "does this user own this Task"
 */
function isOwner(owner, id) {
  return db.get(id)
  .then(doc => {
    return doc.owner == owner
  })
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
    .then(d => ({id: d._id, owner: d.owner, done: d.done, value: d.value}))
}

/**
 * Update Task from database
 * @param      {string}   id Owner
 * @param      {string}   id Tasks id
 * @param      {string}   value Tasks content
 * @param      {boolean}  done Flag if task is done/undone
 * @return     {Task} Promise of the just created task
 */
function updateTask(owner, id, value, done) {
  return createTask(owner, id, value, done)
}

function hash(password) {
  return new Promise((fulfill, reject) => {
    bcrypt.hash(password, null, null, function(err, hash) {
      if (err) { return reject(err) }
      fulfill(hash)
    });
  })
}

function compareHash(password, hash) {
  return new Promise((fulfill, reject) => {
    bcrypt.compare(password, hash, function(err, hash) {
      if (err) { return reject(err) }
      fulfill(hash)
    });
  })
}

/**
 * Create User
 * @param      {string}   username Username
 * @param      {string}   password Password as plain text (bcrypted automaticly before saving to DB)
 * @return     {User} Promise of the just created User
 */
function createUser(username, password) {
  return hash(password)
  .then(hash => {
    return db.put({_id: username, password: hash})
  })
  .then(r => ({username}))
}

/**
 * Function for checking if user already exists in DB
 * @param      {string}   username Username
 * @return     {User} Promise of the state if user already exists
 */
function userExists(username) {
  return db.get(username)
  .then(user => {
    return true
  }).catch(err => {
    return false
  })
}

/**
 * Check user credentials
 * @param      {string}   username Username
 * @param      {string}   password Password to check as plain text
 * @return     {boolean}  Promise of the status of credential check. false => fail, true => ok!
 */
function checkUserCredentials(username, password) {
  return db.get(username)
  .then(user => {
    return compareHash(password, user.password)
  })
}




module.exports = {
  allUserTasks,
  createTask,
  deleteTask,
  isOwner,
  getTask,
  updateTask,
  createUser,
  userExists,
  checkUserCredentials
}
