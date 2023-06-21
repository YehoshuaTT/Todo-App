const Todo = require("../models/todo.model");

//TODO: if something is not found, dont send 200, search for better http code
class TodoController {
  static async index(req, res) {
    try {
      let result = await Todo.find({});
      res.send(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      //TODO: insert the user id here
      // const userId = req.user._id
      let todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        //userId
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
      const updating = await Todo.findByIdAndUpdate(req.params.id, req.body);
      res.send(await Todo.findById(req.params.id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      let doc = await Todo.findByIdAndDelete(req.params.id);
      res.send(doc);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = TodoController;
