const List = require("../models/list.model");
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
    const todo = await Todo.findOne({ _id: todoId, userId }).lean();

    if (!todo) return;

    await Todo.deleteOne({ _id: todoId, userId });

    // Update associated List documents to remove the reference to the deleted Todo
    await List.updateMany({ todos: todoId }, { $pull: { todos: todoId } });

    return todo;
  }
  static async toggle(todoId, userId) {
    const toggling = await Todo.findOne({ _id: todoId, userId });
    if (toggling) {
      toggling.completed = !toggling.completed;
      toggling.save();
    } else throw new Error();
  }
}

module.exports = TodosService;
