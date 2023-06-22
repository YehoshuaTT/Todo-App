const express = require("express");

const TodoController = require("../contollers/todo.controller");
const { validateToken } = require("../middleware/auth");

const todoRoutes = express.Router();
todoRoutes.use(validateToken);

todoRoutes.get("/", TodoController.index);
todoRoutes.get("/:id", TodoController.show);
todoRoutes.post("/", TodoController.create);
todoRoutes.put("/:id", TodoController.update);
todoRoutes.delete("/:id", TodoController.delete);

module.exports = todoRoutes;
