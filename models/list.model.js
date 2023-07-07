const mongoose = require("mongoose");
const Todo = require("./todo.model");
const { Schema } = mongoose;

const ListSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: false,
    },
    todos: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
