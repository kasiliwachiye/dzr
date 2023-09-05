import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState({});
  const [topTracks, setTopTracks] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtistInfo() {
      try {
        // Fetch artist info from your backend server
        const artistResponse = await fetch(
          `http://localhost:6969/artist/${artistId}`
        );

        if (!artistResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const artistData = await artistResponse.json();
        setArtistInfo(artistData);

        // Fetch top tracks
        const topTracksResponse = await fetch(
          `http://localhost:6969/artist/${artistId}/top`
        );

        if (!topTracksResponse.ok) {
          throw Error("Network response for top tracks was not ok");
        }

        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData);

        // Fetch top albums
        const allAlbumsResponse = await fetch(
          `http://localhost:6969/artist/${artistId}/albums`
        );

        if (!allAlbumsResponse.ok) {
          throw new Error("Network response for top albums was not ok");
        }

        const allAlbumsData = await allAlbumsResponse.json();
        setAllAlbums(allAlbumsData);

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
        <p className="p-5">Loading...</p>
      ) : (
        <div className="md:flex md:items-center lg:flex lg:items-center lg:justify-evenly">
          {/* Banner of the Artist */}
          <div className="p-5">
            <h1 className="text-3xl lg:text-5xl font-serif font-extralight italic">
              {artistInfo.name}
            </h1>
            <img
              src={artistInfo.picture_xl}
              alt="artist-banner"
              className="md:h-60 lg:h-96"
            />
          </div>

          <div>
            <p className="font-bold italic text-3xl p-5">
              {artistInfo.nb_fan.toLocaleString()} fans
            </p>
          </div>

          {/* Top Tracks */}
          <div className="p-5">
            <h2 className="font-bold hover:underline">Top 5 Tracks</h2>
            <ul>
              {topTracks.length > 0
                ? topTracks.map((track) => (
                    <li key={track.id} className="mb-2 flex">
                      <div>
                        <img
                          src={track.album.cover_medium}
                          alt="song-cover"
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-sm">{track.title}</p>
                        <p className="font-md text-sm">{track.artist.name}</p>
                        <p className="font-thin italic text-sm">
                          {formatDuration(track.duration)}
                        </p>
                      </div>
                    </li>
                  ))
                : "No top tracks available"}
            </ul>
          </div>
        </div>
      )}

      {/* List of Top Albums */}
      <div className="p-5">
        <h2 className="font-bold mb-4">Albums by {artistInfo.name}</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allAlbums.length > 0
            ? allAlbums.map((album) => (
                <li
                  key={album.id}
                  className="mb-2 flex md:flex-col lg:flex-col"
                >
                  <div>
                    <img
                      src={album.cover_medium}
                      alt="album-cover"
                      className="w-16 h-16 hover:opacity-50 hover:cursor-pointer md:w-36 md:h-36 lg:w-64 lg:h-56"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{album.title}</p>
                    <p className="font-semibold">
                      {album.release_date.split("-")[0]}
                    </p>
                  </div>
                </li>
              ))
            : "No top albums available"}
        </ul>
      </div>
    </div>
  );
};

// Helper function to format duration from seconds to "mm:ss" format
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default ArtistDetails;
