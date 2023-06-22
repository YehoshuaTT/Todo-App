const List = require("../models/list.model");

class ListController {
  static async index(req, res) {
    try {
      res.send(await List.find({ userId: req.user }));
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
      res.send(await List.findOne({ _id: req.params.id, userId: req.user.id }));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      res.send(
        await List.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.id },
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
      res.send(
        await List.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ListController;
