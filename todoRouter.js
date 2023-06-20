const express = require("express");

const TodoController = require("./controller");

const todoRoutes = express.Router();
todoRoutes.get("/", TodoController.index);
todoRoutes.get("/:id", TodoController.show);
todoRoutes.post("/", TodoController.create);
todoRoutes.put("/:id", TodoController.update);
todoRoutes.delete("/:id", TodoController.delete);

module.exports = todoRoutes;
