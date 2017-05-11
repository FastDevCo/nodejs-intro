const jwt = require('jsonwebtoken')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const assert = chai.assert
const {app,DEFAULT_STATE, USER_DB} = require('../server')
chai.use(chaiHttp)

const {createToken} = require('../lib')
const token = `Bearer ${createToken({username: 'testuser'})}`

describe('Tasks CRUD', function() {
  it('should list ALL tasks on /api/todos GET', done => {
    chai.request(app)
      .get('/api/todos')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.deep.equal(DEFAULT_STATE)
        done()
      })
  })
  it('should add a SINGLE Task on /api/todos POST', done => {
    chai.request(app)
      .post('/api/todos')
      .set('Authorization', token)
      .send({value: 'foobar'})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.all.keys('id', 'done', 'value')
        assert(res.body.done == false)
        assert(res.body.value == 'foobar')
        done()
      })
  })

  it('should update a SINGLE task on /api/todos/<id> PUT', done => {
    const testTask = DEFAULT_STATE[0]
    const put = () => chai.request(app).put(`/api/todos/${testTask.id}`).set('Authorization', token)
    Promise.all([
      put().send({value: 'duhbar'}),
      put().send({done: true})
    ]).then(([res1, res2]) => {
      res1.should.have.status(200)
      res1.body.should.have.all.keys('id', 'done', 'value')
      res1.body.should.have.property('done', false)
      res1.body.should.have.property('value', 'duhbar')
      res2.should.have.status(200)
      res2.body.should.have.all.keys('id', 'done', 'value')
      res2.body.should.have.property('done', true)
      done()
    }).catch(e => {
      console.log(e)
    })
  })

  it('should delete a SINGLE blob on /api/todos/<id> DELETE', done => {
    const testTask = DEFAULT_STATE[0]
    testTask.value.should.equal('duhbar')

    chai.request(app)
      .delete(`/api/todos/${testTask.id}`)
      .set('Authorization', token)
      .send()
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.deep.equal({})
        chai.request(app).get('/api/todos').set('Authorization', token).end((err, res) => {
          res.body.length.should.equal(DEFAULT_STATE.length)
          res.body[0].value.should.not.equal('duhbar')
          done()
        })
      })
  })
})

describe('AUTH', () => {
  it('should create user and provide a token with POST /api/auth/register', done => {
    chai.request(app)
      .post('/api/auth/register')
      .send({username: 'FOOUSER', password: 'barpass'})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.all.keys('token')
        // WIP: we of course won't use hardcoded secrets in our course
        const payload = jwt.verify(res.body.token, 'not a very good secret')
        payload.should.have.property('username', 'FOOUSER')
        done()
      })
  })

  it('should return token for existing user with POST /api/auth/login', done => {
    // WIP: we of course won't use plaintext passwords in our course
    USER_DB['testuser'] = {username: 'testuser', password: 'foobar123'}
    chai.request(app)
      .post('/api/auth/login')
      .send({username: 'testuser', password: 'foobar123'})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.all.keys('token')
        // WIP: we of course won't use hardcoded secrets in our course
        const payload = jwt.verify(res.body.token, 'not a very good secret')
        payload.should.have.property('username', 'testuser')
        done()
      })

  })
})
