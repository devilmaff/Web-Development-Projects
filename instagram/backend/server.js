const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/db'); // Destructure the import
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const postRouter = require('./routes/post');
const storyRouter = require('./routes/story');
const userRouter = require('./routes/user');

// Create Express app
const app = express();
// Configure CORS options if needed
const corsOptions = {
  origin: '*', // Replace with your client's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Enable this if you need to send cookies or auth headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Connect to MongoDB
connectToDB()
  .then(() => {
    // Start your server here
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
// Middleware to parse JSON bodies
app.use(express.json());
// Define your routes and other server logic below
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/post", postRouter);
app.use("/story", storyRouter);
app.use("/user", userRouter);

