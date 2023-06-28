const ListService = require("../services/lists.service");

class ListController {
  static async index(req, res) {
    try {
      res.send(await ListService.index(req.user.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      res.send(await ListService.create(req.body, req.user.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async show(req, res) {
    try {
      res.send(await ListService.show(req.params.id, req.user.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      res.send(await ListService.update(req.params.id, req.user.id, req.body));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      await ListService.delete(req.params.id, req.user.id);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async storeTodo(req, res) {
    try {
      res.send(
        await ListService.storeTodo(req.params.id, req.user.id, req.body)
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async toggle(req, res) {
    try {
      await ListService.toggle(req.params.id, req.user.id, req.params.todoId);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  static async updateCategory(req, res) {
    try {
      res.send(
        await ListService.update(
          req.params.id,
          req.user.id,
          req.params.category
        )
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ListController;
