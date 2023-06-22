const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
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
  completed: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    deafult: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
