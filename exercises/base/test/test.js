/*

These are your tests. Run them with `npm test` (in your CLI).

This explains testing with Mocha (test runner) and Chai (syntax sugar)

http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WRRuJLyGOEI

Relevant documentation:

https://mochajs.org/
http://chaijs.com/
https://github.com/chaijs/chai-http
*/

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const assert = chai.assert

const {app} = require('../server')
chai.use(chaiHttp)

describe('API', function () {
  it('should return 200 with a greeting', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.deep.equal({'text': 'This is not correct....'})
        done() // call me when the test is ready
      })
  })
})

describe('TODO items API', function () {

  // it('should list ALL tasks on /api/todos GET', (done) => {
  //   chai.request(app)
  //     .get('/api/todos')
  //     .end((err, res) => {
  //       // asserts
  //       done()
  //     })
  // })

  // it('maybe there was some other things to test too?', done => {
  // })

})
