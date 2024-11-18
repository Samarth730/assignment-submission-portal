const express = require('express');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { handleError } = require('./utils/errorHandler'); // Import error handler

const app = express();

app.use(express.json());

// User Routes
app.use('/users', userRoutes);

// Admin Routes
app.use('/admins', adminRoutes);

// Global Error Handling Middleware
app.use(handleError); // Add this at the end of the middleware stack

module.exports = app;
const connectDB = require('./db');

// Connect to MongoDB
connectDB();

