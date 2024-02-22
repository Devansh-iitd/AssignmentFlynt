const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {});
mongoose.connection.on('error', error => console.error(error));
mongoose.connection.on('open', () => console.log('Success!'));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/books', bookRoutes);


// Start the server

app.listen(3000, () => console.log('Server is running...'));







