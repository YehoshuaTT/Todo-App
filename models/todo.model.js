const mongoose = require("mongoose");
const { Schema } = mongoose;

//TODO: add user id to the schema
// search in the internet for the valid mongo Type for this id
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
