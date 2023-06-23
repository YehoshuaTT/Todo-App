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
      required: true,
    },
    description: {
      type: String,
      required: false,
    },

    todos: {
      type: [Todo.schema],
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
