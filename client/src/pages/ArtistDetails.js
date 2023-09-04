import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtistInfo() {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setArtistInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    }

    fetchArtistInfo();
  }, [artistId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{artistInfo.name}</h1>
          <p>Total Fans: {artistInfo.nb_fan}</p>
          <p>Top 5 Tracks:</p>
          <ul>
            {artistInfo.top_tracks.data.map((track) => (
              <li key={track.id}>{track.title}</li>
            ))}
          </ul>
          <p>List of Albums:</p>
          <ul>
            {artistInfo.albums.data.map((album) => (
              <li key={album.id}>
                <Link to={`/album/${album.id}`}>{album.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArtistDetails;
