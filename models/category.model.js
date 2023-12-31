const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
     required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
