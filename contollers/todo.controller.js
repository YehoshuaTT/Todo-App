const List = require("../models/list.model");
const Todo = require("../models/todo.model");

class TodoController {
  static async index(req, res) {
    try {
      res.send(await Todo.find({ userId: req.user }));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      res.send(
        await Todo.create({
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
      res.send(await Todo.findOne({ _id: req.params.id, userId: req.user.id }));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      res.send(
        await Todo.findOneAndUpdate(
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
        await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  static async toggle(req, res) {
    try {
      let todo = await Todo.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
      todo.completed = !todo.completed;
      await todo.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = TodoController;
