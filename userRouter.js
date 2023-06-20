const express = require("express");

const todoRoutes = express.Router();
const auth = require("../middleware/auth");

module.exports = todoRoutes;
