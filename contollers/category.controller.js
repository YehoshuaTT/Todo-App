const CategoryService = require("../services/categories.service");

class CategoryController {
  static async index(req, res) {
    try {
      res.send(await CategoryService.index(req.user._id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      await CategoryService.create(req.body.title, req.user.id);
      res.sendStatus(200);
    } catch (err) {
      if (err.message === "duplication error") {
        res.status(400).send("duplicated title");
      }
      res.sendStatus(500);
    }
  }

  static async show(req, res) {
    try {
      res.send(await CategoryService.show(req.params.id, req.user.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      res.send(
        await CategoryService.update(req.params.id, req.user.id, req.body)
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      res.send(await CategoryService.delete(req.params.id, req.user.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = CategoryController;
