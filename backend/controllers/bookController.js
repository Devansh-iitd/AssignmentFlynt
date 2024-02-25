//const book = require('../models/book');
const mongoose = require("mongoose");
const Book = require("../models/book");
const axios = require("axios");

// Create a new book

const create = async (req, res) => {
  ////console.log(req.body);
  const data = req.body;
  const book = new Book(data);

  try {
    const response = await axios.get(
      `https://covers.openlibrary.org/b/isbn/${data.ISBN}-L.jpg`
    );
    //console.log(response);

    if (response.data.startsWith("GIF89a")) {
      book.cover =
        "https://authors.bookfunnel.com/wp-content/uploads/2017/02/Soothing_Clouds.jpg";
    } else {
      book.cover = response.request.res.responseUrl;
    }

    //console.log(book);

    await book.save();
    ////console.log(book);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get all books
const getAll = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a book by id

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a book by id

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const book = await Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    const response = await axios.get(
      `https://covers.openlibrary.org/b/isbn/${data.ISBN}-L.jpg`
    );
    if (response.data.startsWith("GIF89a")) {
      book.cover =
        "https://authors.bookfunnel.com/wp-content/uploads/2017/02/Soothing_Clouds.jpg";
    } else {
      book.cover = response.request.res.responseUrl;
    }
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book by id

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
