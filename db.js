const mongoose = require('mongoose');
require('dotenv').config(); // Load variables from .env file

const connectDB = async () => {
    try {
        // Use the connection string from the .env file
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the application on connection failure
    }
};

module.exports = connectDB;
