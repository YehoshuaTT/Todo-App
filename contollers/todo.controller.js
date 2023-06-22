const List = require("../models/list.model");
const Todo = require("../models/todo.model");
const ListController = require("./list.controller");

class TodoController {
  static async index(req, res) {
    try {
      res.send(await Todo.find({}));
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
      console.log(todo.id);
      if (todo.userId)
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
      const result = await Todo.findById(req.params.id);
      if (result) res.send(result);
      else res.send("No result");
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      await Todo.findByIdAndUpdate(req.params.id, req.body);
      res.send(await Todo.findById(req.params.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      res.send(await Todo.findByIdAndDelete(req.params.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = TodoController;
