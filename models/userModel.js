const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
