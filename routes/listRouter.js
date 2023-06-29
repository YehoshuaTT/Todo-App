const express = require("express");

const ListController = require("../contollers/list.controller");
const { validateToken } = require("../middleware/auth");

const listRoutes = express.Router();
listRoutes.use(validateToken);

listRoutes.get("/", ListController.index);
listRoutes.get("/:id", ListController.show);
listRoutes.put("/:id/todos/:todoId/toggle", ListController.toggle);
listRoutes.put("/:id", ListController.update);
listRoutes.post("/:id/todos", ListController.storeTodo);
listRoutes.post("/", ListController.create);
listRoutes.put("/:id/:category", ListController.updateCategory);
listRoutes.delete("/:id", ListController.delete);

module.exports = listRoutes;
