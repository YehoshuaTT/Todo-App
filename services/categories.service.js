const Category = require("../models/category.model");

class CategoryService {
  static async index(userId) {
    return Category.find({ userId });
  }

  static async create(title, userId) {
    if (await Category.findOne({ title, userId }))
      throw new Error("duplication error");
    return await Category.create({ title, userId });
  }

  static async show(categoryId, userId) {
    return await Category.findOne({ _id: categoryId, userId });
  }

  static async update(categoryId, userId, toBeUpdated) {
    return Category.findOneAndUpdate(
      { _id: categoryId, userId },
      { ...toBeUpdated },
      { new: true }
    );
  }

  static async delete(categoryId, userId) {
    return Category.findOneAndDelete({ _id: categoryId, userId });
  }
}

module.exports = CategoryService;
