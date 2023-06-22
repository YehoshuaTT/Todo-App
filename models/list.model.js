const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now(),
  },

  todos: { type: [{ type: Schema.Types.ObjectId, ref: "Todo" }], default: [] },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
