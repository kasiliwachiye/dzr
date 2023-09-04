import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Function to format duration
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
}

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Format duration for each track
        const formattedResults = data.data.map((track) => ({
          ...track,
          duration: formatDuration(track.duration),
        }));

        setSearchResults(formattedResults);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h1 className="p-5 text-xl font-bold">Search Results for: {query}</h1>
      {loading ? (
        <p className="p-5">Loading...</p>
      ) : (
        <ul className="p-5 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {searchResults.map((track) => (
            <li key={track.id} className="m-2">
              <img src={track.album.cover_small} alt="album-art" />
              <p className="text-xs mt-1">{track.duration}</p>
              <p className="font-bold text-sm">{track.title}</p>
              <Link
                to={`/artist/${track.artist.id}`}
                className="text-xs hover:underline"
              >
                {track.artist.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
