const express = require("express");

const CategoryController = require("../contollers/category.controller");
const { validateToken } = require("../middleware/auth");

const categoryRoutes = express.Router();
categoryRoutes.use(validateToken);

categoryRoutes.get("/", CategoryController.index);
categoryRoutes.get("/:id", CategoryController.show);
categoryRoutes.put("/:id", CategoryController.update);
categoryRoutes.delete("/:id", CategoryController.delete);
categoryRoutes.post("/", CategoryController.create);

module.exports = categoryRoutes;
