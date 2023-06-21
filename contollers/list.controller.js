const List = require("../models/list.model");

class ListController {
  static async index(req, res) {
    try {
      res.send(await List.find({}));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      let list = await List.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id,
      });

      res.send(list);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async show(req, res) {
    try {
      const result = await List.findById(req.params.id);
      if (result) res.send(result);
      else res.send("No result");
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      await List.findByIdAndUpdate(req.params.id, req.body);
      res.send(await List.findById(req.params.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      res.send(await List.findByIdAndDelete(req.params.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ListController;
