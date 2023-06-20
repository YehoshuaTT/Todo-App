const express = require("express");
const authController = require("./auth.controller");
const authRoutes = express.Router();

authRoutes.post("/", authController.validateToken);

module.exports = authRoutes;
