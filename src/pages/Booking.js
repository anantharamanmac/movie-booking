import React, { useState, useEffect } from "react";
import SeatSelector from "../components/SeatSelector";
import Toast from "../components/Toast";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Booking() {
  const { movieId } = useParams(); // movie ID from route
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showTimings = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];
  
  // Initialize bookedSeats state
  const [bookedSeats, setBookedSeats] = useState({
    "10:00 AM": [],
    "01:00 PM": [],
    "04:00 PM": [],
    "07:00 PM": [],
    "10:00 PM": [],
  });

  console.log("movieId:", movieId); // DEBUG

  const next5Dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // Fetch booked seats from backend on mount or movieId change
  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!movieId) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings/${movieId}`);
        const seatsByTime = { "10:00 AM": [], "01:00 PM": [], "04:00 PM": [], "07:00 PM": [], "10:00 PM": [] };
        
        res.data.forEach(booking => {
          const time = booking.showtime.time;
          if (seatsByTime[time]) {
            seatsByTime[time] = [...seatsByTime[time], ...booking.seats];
          }
        });

        setBookedSeats(seatsByTime);
      } catch (err) {
        console.error("Failed to fetch booked seats:", err.response?.data || err.message);
      }
    };

    fetchBookedSeats();
  }, [movieId]);

  const handleBooking = async () => {
    if (!movieId) {
      setToastMessage("Movie ID is missing!");
      return;
    }
    if (!selectedTime || !selectedSeats.length || !selectedDate) {
      setToastMessage("Please select a date, show timing, and seats!");
      return;
    }

    const totalPrice = selectedSeats.length * 200; // price per seat
    const showtime = {
      theater: "Main Theater",
      time: selectedTime,
      date: selectedDate,
    };

    const payload = {
      movieId,
      showtime,
      seats: selectedSeats,
      totalPrice,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/bookings`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update local booked seats
      setBookedSeats(prev => ({
        ...prev,
        [selectedTime]: [...prev[selectedTime], ...selectedSeats],
      }));

      setToastMessage(`Booking successful! Seats: ${selectedSeats.join(", ")}`);
      setSelectedSeats([]);
      setSelectedTime("");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setToastMessage(err.response?.data?.message || "Booking failed!");
    }
  };

  const handleSeatClick = (seat, bookedSeatsForTime) => {
    if (bookedSeatsForTime.includes(seat)) {
      setToastMessage(`Seat ${seat} is already booked!`);
      return;
    }
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-red-500">
          Book Your Tickets
        </h1>

        {/* Date Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs md:text-sm">
          {next5Dates.map(d => {
            const dateStr = d.toISOString().split("T")[0];
            return (
              <button
                key={dateStr}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setSelectedTime("");
                  setSelectedSeats([]);
                }}
                className={`px-3 py-1 rounded-md font-semibold border-2 ${
                  selectedDate === dateStr
                    ? "bg-red-600 border-red-800 text-white"
                    : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-red-600 hover:text-white transition"
                }`}
              >
                {d.toDateString().slice(0, 10)}
              </button>
            );
          })}
        </div>

        {/* Sidebar + Seats */}
        {selectedDate ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="flex flex-col gap-4 w-48 md:w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-3 md:p-4 shadow-xl flex-shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-red-400 mb-3 text-center tracking-wider drop-shadow-md">
                Show Timings 🎬
              </h3>
              {showTimings.map(time => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setSelectedSeats([]);
                  }}
                  className={`w-full px-3 py-1.5 mb-1.5 rounded-lg text-white text-sm md:text-base font-semibold border-2 border-red-600 shadow-md transition-all duration-300
                    ${selectedTime === time
                      ? "bg-gradient-to-r from-red-600 to-red-800 animate-pulse shadow-red-500"
                      : "bg-gray-900/40 hover:bg-red-600 hover:text-white hover:scale-105"}`}
                >
                  {time}
                </button>
              ))}

              {/* Seat Legend */}
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-md border border-white/20 mt-4 text-xs md:text-sm">
                <h4 className="text-red-400 font-bold mb-1 text-center drop-shadow-md">
                  Legend
                </h4>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-black border-2 border-red-600 rounded-md shadow-inner"></div>
                    <span className="text-white">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-red-600 to-red-800 rounded-md shadow-md"></div>
                    <span className="text-white">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-700 rounded-md shadow-inner"></div>
                    <span className="text-white">Booked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="flex-1 mt-6 md:mt-0">
              {selectedTime ? (
                <SeatSelector
                  rows={6}
                  cols={10}
                  selectedSeats={selectedSeats}
                  onSelect={setSelectedSeats}
                  bookedSeats={bookedSeats[selectedTime]}
                  onSeatClick={seat => handleSeatClick(seat, bookedSeats[selectedTime])}
                />
              ) : (
                <p className="text-gray-300 mt-10 text-center md:mt-20">
                  Select a show timing first
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-300 mt-10 text-center md:mt-20">
            Select a date to see available show timings
          </p>
        )}

        {/* Book Tickets Button */}
        {selectedSeats.length > 0 && selectedTime && selectedDate && (
          <div className="mt-4 text-center">
            <p className="text-sm md:text-base mb-2">
              Time: {selectedTime} | Seats: {selectedSeats.join(", ")}
            </p>
            <button
              onClick={handleBooking}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-full hover:scale-105 transition transform"
            >
              Book Tickets
            </button>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </main>
    </div>
  );
}
