const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
