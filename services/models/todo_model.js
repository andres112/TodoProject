const mongoose = require("mongoose");

// Set the mongoose schema to a const
const Schema = mongoose.Schema;

const todo_tagSchema = mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  }
});

const todoSchema = mongoose.Schema(
  {
    id: {
      type: String
    },
    title: {
      type: String
    },
    completed: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    },
    order: {
      type: Number
    },
    tags: [todo_tagSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("todos", todoSchema);
