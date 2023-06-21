const jwt = require("jsonwebtoken");
require("dotenv");
const secret = process.env.SECRET;

const createToken = async (data) => {
  //TODO: change email to user's id
  return jwt.sign({ email: data }, secret, { expiresIn: "10h" });
};

const validateToken = async (req, res, next) => {
  try {
    const token = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      secret
    );
    // TODO: do something with token!
    // like finding the user by its id and saving the value into context i.e the request
    // req.user = user
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

const findByToken = async (token) => {
  // TODO: find user from mongoose by its token i.e the user's id
};

module.exports = { createToken, validateToken, findByToken };
