const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  console.log('Verify Token =>',token)
  if (!token) return res.sendStatus(403);

  await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.user = decode.username;
    next();
    return;
  });
};

module.exports = verifyToken;
