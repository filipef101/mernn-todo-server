const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  project: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todo',
    },
  ],
},
)

module.exports = Project = mongoose.model("project", projectSchema);
