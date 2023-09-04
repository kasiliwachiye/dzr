const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 6969;

// Configure CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Middleware for CORS
app.use(cors());

// Routes

// Test route:
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
