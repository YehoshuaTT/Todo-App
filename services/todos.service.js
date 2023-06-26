const Todo = require("../models/todo.model");

class TodosService {
  static async index(userId) {
    return Todo.find({ userId });
  }

  static async show(todoId, userId) {
    return Todo.findOne({ _id: todoId, userId });
  }

  static async create(todo, userId) {
    return Todo.create({ ...todo, userId });
  }

  static async update(todoId, userId, todo) {
    return Todo.findOneAndUpdate(
      { _id: todoId, userId: userId },
      { ...todo },
      { new: true }
    );
  }

  static async delete(todoId, userId) {
    return Todo.findOneAndDelete({ _id: todoId, userId });
  }

  static async toggle(todoId, userId) {
    let todo = await Todo.findOne({ _id: todoId, userId });
    todo.completed = !todo.completed;
    await todo.save();
  }
}

module.exports = TodosService;
