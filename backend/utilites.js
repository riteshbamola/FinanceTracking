const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (!token) return res.status(400).json({ message: "401" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(user)
    if (err) { console.log("User not geenrated"); return res.sendStatus(401).json({ msg: "undefined" }); }
    req.user = user;

    next();
  })
}
module.exports = {
  authenticateToken,
}