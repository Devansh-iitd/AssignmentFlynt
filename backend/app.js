const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {});
mongoose.connection.on('error', error => console.error(error));
mongoose.connection.on('open', () => console.log('Success!'));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use('/books', bookRoutes);


// Start the server

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging.
    res.status(500).send('Something broke!');
  });
  

app.listen(3000, () => console.log('Server is running...'));







