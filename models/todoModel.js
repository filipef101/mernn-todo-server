const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'project',
  },
  todo: {
    type: String,
    required: true
  },
  finished: {
    type: Date,
    required: false,
    default: null
  },
})

module.exports = Todo = mongoose.model("todo", todoSchema);
