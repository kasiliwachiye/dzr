import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [bannerArtist, setBannerArtist] = useState([]);
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [chartingAlbums, setChartingAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data for the banner artist
        const bannerResponse = await fetch(
          "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=the1975"
        );

        if (!bannerResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const bannerData = await bannerResponse.json();
        setBannerArtist(bannerData);

        // Fetch data for trending tracks
        const trendingResponse = await fetch(
          "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks"
        );

        if (!trendingResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const trendingData = await trendingResponse.json();
        setTrendingTracks(trendingData.data);

        // Fetch data for charting albums
        const chartingResponse = await fetch(
          "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums"
        );

        if (!chartingResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const chartingData = await chartingResponse.json();
        setChartingAlbums(chartingData.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="p-5">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 m-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 hidden md:col-span-1 md:block lg:col-span-1 lg:block border-opacity-50">
            <h2 className="text-xs font-bold mb-2 italic lg:text-xl">
              TRENDING
            </h2>
            <div className="grid h-screen card rounded-box place-items-start pt-2">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {trendingTracks.map((track) => (
                  <li key={track.id} className="flex flex-col items-center">
                    <img
                      src={track.album.cover_medium}
                      alt={track.title}
                      className="w-16 h-16 object-cover text-center mask mask-squircle"
                    />
                    <p className="text-center font-semibold text-xs">
                      {track.title}
                    </p>
                    <Link
                      to={`/artist/${track.artist.id}`}
                      className="text-center text-xs hover:underline hover:cursor-pointer"
                    >
                      {track.artist.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-5 md:col-span-2 lg:col-span-3">
            <h2 className="text-xs font-bold mb-2 italic lg:text-xl">
              FEATURED
            </h2>

            <div className="grid card place-items-start">
              <img
                src={bannerArtist.data[14].artist.picture_xl}
                alt="sample-cover"
                className="w-full h-full object-cover md:h-4/5 lg:h-4/5"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <p className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 font-serif italic">
                  {bannerArtist.data[14].artist.name.toUpperCase()} -{" "}
                  {bannerArtist.data[14].title_short.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-3 md:col-span-1 lg:col-span-1">
            <h2 className="text-xs font-bold mb-2 italic lg:text-xl">
              CHARTING ALBUMS
            </h2>
            <div className="grid h-screen card rounded-box place-items-start pt-2">
              <ul className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {chartingAlbums.map((album) => (
                  <li key={album.id} className="flex flex-col items-center">
                    <img
                      src={album.cover_medium}
                      alt={album.title}
                      className="w-16 h-16 object-cover mask mask-squircle"
                    />
                    <p className="text-center font-semibold text-xs">
                      {album.title}
                    </p>
                    <Link
                      to={`/artist/${album.artist.id}`}
                      className="text-center text-xs hover:underline hover:cursor-pointer"
                    >
                      {album.artist.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
