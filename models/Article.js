const mongoose = require("mongoose");
require("./User");
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true, // CKEditor content goes here
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: false,
  },
});
const articleModel =
  mongoose.models.Article || mongoose.model("Article", schema);

export default articleModel;
