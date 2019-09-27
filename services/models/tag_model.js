const mongoose = require("mongoose");

const tag_todoSchema = mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  completed: {
    type: Boolean
  },
  order: {
    type: Number
  },
  url: {
    type: String
  }
});

const tagSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String
    },
    url: {
      type: String
    },
    todos:{
      type:[tag_todoSchema]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("tags", tagSchema);
