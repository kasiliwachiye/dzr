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

    // Send API response to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetching trending tracks
app.get("/trending", async (req, res) => {
  try {
    // Modify API URL as needed
    const trendingUrl = "https://api.deezer.com/chart/0/tracks";
    const response = await axios.get(trendingUrl);

    // Send API response to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetching charting albums
app.get("/charting", async (req, res) => {
  try {
    // Modify API URL as needed
    const chartingUrl = "https://api.deezer.com/chart/0/albums";
    const response = await axios.get(chartingUrl);

    // Send API response to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetching artist information
app.get("/artist/:artistId", async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const artistUrl = `https://api.deezer.com/artist/${artistId}`;
    const response = await axios.get(artistUrl);

    // Send API response to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetching top tracks of an artist
app.get("/artist/:artistId/top", async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const topTracksUrl = `https://api.deezer.com/artist/${artistId}/top?limit=5`;
    const response = await axios.get(topTracksUrl);

    // Send API response to the client
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetching albums of an artist
app.get("/artist/:artistId/albums", async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const albumsUrl = `https://api.deezer.com/artist/${artistId}/albums`;
    const response = await axios.get(albumsUrl);

    // Send API response to the client
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
