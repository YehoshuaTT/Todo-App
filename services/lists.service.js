const List = require("../models/list.model");
const Todo = require("../models/todo.model");

class ListService {
  static async index(userId) {
    return await List.find({ userId });
  }

  static async create(list, userId) {
    return await List.create({ ...list, userId: userId });
  }

  static async show(listId, userId) {
    return await List.findOne({ _id: listId, userId: userId });
  }

  static async update(listId, userId, category) {
    return await List.findOneAndUpdate(
      { _id: listId, userId: userId },
      { category },
      { new: true }
    );
  }

  static async delete(listId, userId) {
    await List.findOneAndDelete({ _id: listId, userId: userId });
  }

  static async storeTodo(listId, userId, todoParams) {
    const todo = new Todo(todoParams);
    const list = await List.findOne({ _id: listId, userId: userId });
    list?.todos?.push(todo);
    const result = await list?.save();
    if (result) return todo;
  }

  static async toggle(listId, userId, todoId) {
    let list = await List.findOne({ _id: listId, userId: userId });

    let todo = list.todos.find((todo) => todo._id.equals(todoId));

    if (todo) {
      todo.completed = !todo?.completed;
      await list.save();
    }
  }
  static async updateCategory(listId, userId, category) {
    return await List.findOneAndUpdate(
      { _id: listId, userId: userId },
      { category },
      { new: true }
    );
  }
}

module.exports = ListService;
