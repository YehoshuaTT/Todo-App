require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const secret = process.env.SECRET;

const createToken = async (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "10h" });
};

const validateToken = async (req, res, next) => {
  try {
    const cookie = req.cookies.userId;
    if (!cookie) return res.sendStatus(401);
    req.user = await findUserByToken(cookie);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};

const findUserByToken = async (token) => {
  const reveal = jwt.verify(token, secret);
  return await User.findById(reveal.id);
};

module.exports = { createToken, validateToken, findUserByToken };
