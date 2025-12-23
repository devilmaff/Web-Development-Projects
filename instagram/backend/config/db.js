const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = 'mongodb+srv://fullstack:NTfullstack%402023@novitechfullstack.hlq2prj.mongodb.net/?retryWrites=true&w=majority';

// Function to connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectToDB }; // Export as an object with connectToDB property
