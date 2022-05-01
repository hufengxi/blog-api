const mongoose = require("mongoose");
const baseModel = require("./base");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = articleSchema;
