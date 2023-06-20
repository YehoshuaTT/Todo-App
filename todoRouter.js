const express = require("express");

const TodoController = require("./todo.controller");
const validToken = require("./auth");

const todoRoutes = express.Router();
todoRoutes.get("/", validToken, TodoController.index);
todoRoutes.get("/:id", validToken, TodoController.show);
todoRoutes.post("/", validToken, TodoController.create);
todoRoutes.put("/:id", validToken, TodoController.update);
todoRoutes.delete("/:id", validToken, TodoController.delete);

module.exports = todoRoutes;
