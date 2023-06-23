const express = require("express");

const ListController = require("../contollers/list.controller");
const { validateToken } = require("../middleware/auth");

const listRoutes = express.Router();
listRoutes.use(validateToken);

listRoutes.get("/", ListController.index);
listRoutes.get("/:id", ListController.show);
listRoutes.post("/", ListController.create);
listRoutes.put("/:id", ListController.update);
listRoutes.delete("/:id", ListController.delete);

module.exports = listRoutes;
