const jwt = require('jsonwebtoken')

const secret = 'bamola';

function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  }
  const token = jwt.sign(payload, secret);
  return token;
}
function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;

}
module.exports = {
  createToken,
  validateToken
}