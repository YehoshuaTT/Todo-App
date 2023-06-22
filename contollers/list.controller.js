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
      res.send(
        await List.create({
          title: req.body.title,
          description: req.body.description,
          userId: req.user.id,
        })
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async show(req, res) {
    try {
      res.send(await List.findById(req.params.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      res.send(
        await List.findByIdAndUpdate(
          req.params.id,
          { title: req.body.title, description: req.body.description },
          { new: true }
        )
      );
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
