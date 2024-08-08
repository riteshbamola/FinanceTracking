const { validateToken } = require('../services/auth')


function userSigninorNot(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName]
    if (!tokenCookieValue)
      console.log("cookie not generated")
    return next();

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) { }
    return next();
  }
}
module.exports = userSigninorNot;