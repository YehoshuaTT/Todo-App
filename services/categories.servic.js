const Category = require("../models/category.model");

class CategoryService {
  static async index(userId) {
    return Category.find({ userId });
  }

  static async show(categoryId, userId) {
    return Category.findOne({ _id: categoryId, userId });
  }

  static async create(name, userId) {
    return Category.create({ name, userId });
  }

  static async update(categoryId, userId, name) {
    return Category.findOneAndUpdate(
      { _id: categoryId, userId },
      { name },
      { new: true }
    );
  }

  static async delete(categoryId, userId) {
    return Category.findOneAndDelete({ _id: categoryId, userId });
  }
}

module.exports = CategoryService;
