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
      let todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id,
      });
      if (req.user.id)
        await List.findByIdAndUpdate(req.body.listId, {
          $push: { todos: todo.id },
        });
      res.send(todo);
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
}

module.exports = TodoController;
