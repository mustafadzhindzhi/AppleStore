const jwt = require("jsonwebtoken");
const userService = require('../services/userService');

exports.auth = async (req, res, next) => {
  const token = req.header("X-Authorization");

  if (token) {
    try {
      const isBlackListed = await userService.isTokenBlackListed(token);
      if(isBlackListed) {
        return res.status(401).json({message: 'Token has been invalidated.'})
      };
      
      const decodedToken = jwt.verify(token, "SOME_SECRET");
      req.user = decodedToken;

      next();
    } catch (error) {
      res.status(401).json({ message: "You are not authorized!" });
    }
  } else {
    next();
  }
};