const express = require("express");
const userController = require("./user.controller");
const userRoutes = express.Router();
userRoutes.post("/", userController.register);
userRoutes.post("/login", userController.login);

module.exports = userRoutes;
