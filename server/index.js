const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 6969;

// Apply middlewares
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Middleware for CORS
app.use(cors());

// ROUTES
// Searching for tracks
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const deezerUrl = `https://api.deezer.com/search?q=${query}`;
    const response = await axios.get(deezerUrl);

    // Send the Deezer API response to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
