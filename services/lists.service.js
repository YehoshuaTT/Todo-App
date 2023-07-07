const List = require("../models/list.model");
const TodosService = require("./todos.service");

class ListService {
  static async index(userId) {
    return await List.find({ userId })
      .populate("category", "title")
      .populate({ path: "todos", model: "Todo" });
  }

  static async create(list, userId) {
    return await List.create({ ...list, userId: userId });
  }

  static async show(listId, userId) {
    return await List.findOne({ _id: listId, userId: userId }).populate(
      "category",
      "title"
    );
  }

  static async update(listId, userId, body) {
    return await List.findOneAndUpdate(
      { _id: listId, userId: userId },
      { title: body.title, description: body.description },
      { new: true }
    );
  }

  static async delete(listId, userId) {
    await List.findOneAndDelete({ _id: listId, userId: userId });
  }

  static async storeTodo(listId, userId, todoParams) {
    const todo = await TodosService.create(todoParams, userId);
    const list = await List.findOne({ _id: listId, userId: userId });
    list?.todos?.push(todo._id);
    const result = await list?.save();
    if (result) return todo;
  }

  static async toggle(listId, userId, todoId) {
    let list = await List.findOne({ _id: listId, userId: userId });

    let todo = list.todos.find((todo) => todo._id.equals(todoId));

    if (todo) {
      todo.completed = !todo?.completed;
      await list.save();
      return true;
    } else throw new Error();
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
