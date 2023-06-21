const express = require("express");
const userController = require("../contollers/user.controller");

const userRoutes = express.Router();

userRoutes.post("/", userController.register);
userRoutes.post("/login", userController.login);

module.exports = userRoutes;
