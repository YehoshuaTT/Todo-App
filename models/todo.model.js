const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
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
  },
  { timestamps: true }
);

TodoSchema.pre("remove", async function (next) {
  try {
    // Access the associated List model and remove the reference to this Todo
    const List = mongoose.model("List");
    await List.updateMany({ todos: this._id }, { $pull: { todos: this._id } });
    next();
  } catch (error) {
    next(error);
  }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
