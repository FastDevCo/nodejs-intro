const jwt = require('jsonwebtoken')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const assert = chai.assert
const { app, db } = require('../server')
chai.use(chaiHttp)


describe('Tasks CRUD', function() {
  it('should list ALL tasks on /api/todos GET', done => {
    db.allTasks()
    .then(dbdata => {

    chai.request(app)
      .get('/api/todos')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.deep.equal(dbdata)
        done()
      })
    })
  })

  it('should add a SINGLE Task on /api/todos POST', done => {
    chai.request(app)
      .post('/api/todos')
      .send({value: 'foobar'})
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.have.all.keys('id', 'done', 'value')
        assert(res.body.done == false)
        assert(res.body.value == 'foobar')
        done()
      })
  })

  it('should update a SINGLE task on /api/todos/<id> PUT', done => {
    const val = 'test value'
    const testTask = {
      value: val
    }

    chai.request(app)
      .post('/api/todos')
      .send(testTask)
      .end((end, res) => {
        const put = () => chai.request(app).put(`/api/todos/${res.body.id}`)

        put().send({value: 'duhbar'})
        .then(res1 => {
          res1.should.have.status(200)
          res1.body.should.have.all.keys('id', 'done', 'value')
          res1.body.should.have.property('done', false)
          res1.body.should.have.property('value', 'duhbar')
          return put().send({done: true})
        })
        .then(res2 => {
          res2.should.have.status(200)
          res2.body.should.have.all.keys('id', 'done', 'value')
          res2.body.should.have.property('done', true)
          return put().send({done: false})
        })
        .then(res3 => {
          res3.body.should.have.property('done', false)
          done()
        }).catch(e => {
          console.log(e)
        })
    })
  })

  it('should delete a SINGLE blob on /api/todos/<id> DELETE', done => {
    const val = 'test value'
    const testTask = {
      value: val
    }

    chai.request(app)
      .post('/api/todos')
      .send(testTask)
      .end((end, res) => {
        const id = res.body.id
        chai.request(app)
        .delete(`/api/todos/${id}`)
        .send()
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.deep.equal({})
          chai.request(app).get('/api/todos').end((err, res) => {
            res.body[0].value.should.not.equal(val)
            done()
          })
        })
    })
  })
})
