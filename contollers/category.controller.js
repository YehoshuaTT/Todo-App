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
      res.send(await CategoryService.create(req.body, req.user.id));
    } catch (err) {
      console.log(err);
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
