const List = require("../models/list.model");
const Todo = require("../models/todo.model");

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
      req.body.todos.forEach((todo) => {
        todo.userId = req.user.id;
      });
      res.send(
        await List.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.id },
          {
            title: req.body.title,
            description: req.body.description,
            todos: req.body.todos,
          },
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
      await List.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  //TODO: create a new endpoint here that will toggle one todo inside the list

  static async toggle(req, res) {
    try {
      let list = await List.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      let theTodo = list.todos.find((todo) =>
        todo._id.equals(req.params.todoId)
      );
      theTodo.completed = !theTodo.completed;
      await list.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = ListController;
