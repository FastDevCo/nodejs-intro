const _ = require('lodash')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

const SECRET = 'not a very good secret'

/*
  Just returns a valid UUID, e.g
  uuid(); // 76306e1f-2614-4f95-ae14-b271127cc774
*/
function uuid() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
          random = Math.random() * 16 | 0;
          if (i === 8 || i === 12 || i === 16 || i === 20) {
                  uuid += '-';
                }
          uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }

    return uuid;
}


/*
  Create a JWT token for user
*/
function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), SECRET, {expiresIn: 60*60*5});
}

/*
  Express middleware that checks JWT tokens
*/
const jwtCheck = expressJWT({secret: SECRET});

module.exports = {
  uuid,
  createToken,
  jwtCheck
}
