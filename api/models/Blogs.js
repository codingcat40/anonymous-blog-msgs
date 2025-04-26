const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  date: {
    type: String,
    required: true,
  },
});

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;
