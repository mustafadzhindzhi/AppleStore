const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require('redis');
const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
      host: '127.0.0.1',
      port: 6379
  }
});
redisClient.connect().catch(console.error);

exports.register = async (userData) => {
  const user = await User.create(userData);
  const result = getResult(user);
  return result;
};

exports.checkEmailExists = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser ? true : false;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const result = getResult(user);
  return result;
};

exports.logout = async(token) => {
  const decoded = jwt.decode(token);
  if(decoded) {
    const expireTime = decoded.exp - Math.floor(Date.now() / 1000);
    await redisClient.setEx(`blacklist_${token}`, expireTime,'logged_out')
  }
};

exports.isTokenBlackListed = async(token) => {
  const result = await redisClient.get(`blacklist_${token}`);
  return result !== null;
}

function getResult(user) {
  const payload = { _id: user._id, email: user.email };
  const token = jwt.sign(payload, "SOME_SECRET", { expiresIn: "2h" });

  const result = {
    _id: user._id,
    accessToken: token,
    email: user.email,
  };

  return result;
}