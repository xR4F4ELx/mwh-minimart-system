const express = require("express");
const cors = require("cors"); // Import the cors middleware
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Import routes and middleware
const mainRoutes = require("./routes/mainRoutes");

// Create an Express app
const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use("/", express.static(path.join(__dirname, "public")));

// Use imported routes
app.use("/api", mainRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("I am Alive!");
});

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Export the app
module.exports = app;
