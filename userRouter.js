const express = require("express");
const userController = require("./user.controller");
const userRoutes = express.Router();
userRoutes.get("/", userController.register);
userRoutes.get("/login", userController.login);
// const auth = require("../middleware/auth");

module.exports = userRoutes;
