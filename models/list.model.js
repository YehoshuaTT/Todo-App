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

  todos: { type: [{ type: Schema.Types.ObjectId, ref: "Todo" }], default: [] },
});

const List = mongoose.model("Todo", ListSchema);

module.exports = List;
