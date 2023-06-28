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

    todos: {
      type: [Todo.schema],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      sparse: true,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
