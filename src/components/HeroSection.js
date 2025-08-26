// src/components/HeroSection.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoader } from "../contexts/LoaderContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [trendingShows, setTrendingShows] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL; // use env variable

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        showLoader();
        const { data } = await axios.get(`${API_URL}/movies`);
        // pick top 5 for hero section
        setTrendingShows(data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch trending shows:", error);
      } finally {
        hideLoader();
      }
    };

    fetchTrending();
  }, [API_URL, showLoader, hideLoader]);

  // auto slide
  useEffect(() => {
    if (trendingShows.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingShows.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trendingShows]);

  if (trendingShows.length === 0) return null;

  const currentShow = trendingShows[currentIndex];

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] overflow-hidden rounded-2xl">
      {/* Background hero image */}
      <img
        src={currentShow.poster}
        alt={currentShow.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100"
      />

      {/* Fades */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent"></div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 md:px-16 text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          {currentShow.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-4 text-gray-300">
          {currentShow.genre} • {currentShow.duration || currentShow.releaseDate}
        </p>
        <button
          onClick={() => navigate(`/movie/${currentShow._id}`)}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition text-sm sm:text-base"
        >
          Book Now
        </button>

        {/* Trending list */}
        <div className="mt-6 flex space-x-6">
          {trendingShows.map((show, index) => (
            <div
              key={show._id}
              className="cursor-pointer text-white font-medium text-sm sm:text-base md:text-lg"
              onClick={() => setCurrentIndex(index)}
            >
              <span
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? "border-b-2 border-red-600"
                    : "opacity-50"
                }`}
              >
                {show.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
