//const book = require('../models/book');
const mongoose = require('mongoose');
const Book = require('../models/book');


// Create a new book

const create = async(req,res) => {
    console.log(req.body);
    const data = req.body;
    const book = new Book(data);
    try{
        await book.save();
        res.status(201).json(book);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

// Get all books
const getAll = async(req,res) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

// Get a book by id

const getById = async(req,res) => {
    const {id} = req.params;
    try{
        const book = await Book.findById(id);
        res.status(200).json(book);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
}

// Update a book by id

const updateById = async(req,res) => {
    const {id} = req.params;
    const data = req.body;
    try{
        const book = await Book.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(book);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

// Delete a book by id

const deleteById = async(req,res) => {
    const {id} = req.params;
    try{
        const book = await Book.findByIdAndDelete(id);
        res.status(200).json(book);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
}


module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
}
