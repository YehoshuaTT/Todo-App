const jwt = require("jsonwebtoken");
require("dotenv");
const secret = process.env.SECRET;

const createToken = async (data) => {
  return jwt.sign({ email: data }, secret, { expiresIn: "10h" });
};

const validateToken = async (req, res, next) => {
  console.log("im in", req.headers);
  try {
    let data = req.headers.authorization.replace("Bearer ", "");
    console.log("data:    ", data);
    const result = jwt.verify(data, secret);
    console.log("result:    ", result);
    res.body = "valid";
    next();
  } catch (err) {
    return null;
  }
};

// const findByToken = async (token) => {
//   const result = jwt.verify(token, secret);
//   return result;
// };

module.exports = { createToken, validateToken, findByToken };
