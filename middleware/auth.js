const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authorized!");

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedUserInfo) => {
    if (err) return res.status(403).json("Invalid Token!");

    req.userInfo = decodedUserInfo;
    next();
  });
};
