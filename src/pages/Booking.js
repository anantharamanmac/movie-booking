import React, { useState } from "react";
import SeatSelector from "../components/SeatSelector";
import Toast from "../components/Toast";

export default function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showTimings = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];
  const [bookedSeats, setBookedSeats] = useState({
    "10:00 AM": [],
    "01:00 PM": [],
    "04:00 PM": [],
    "07:00 PM": [],
    "10:00 PM": [],
  });

  const handleBooking = () => {
    if (!selectedTime || selectedSeats.length === 0) {
      setToastMessage("Please select a show timing and seats!");
      return;
    }

    setBookedSeats((prev) => ({
      ...prev,
      [selectedTime]: [...prev[selectedTime], ...selectedSeats],
    }));

    setToastMessage(`You booked: ${selectedSeats.join(", ")} for ${selectedTime}`);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat, bookedSeatsForTime) => {
    if (bookedSeatsForTime.includes(seat)) {
      setToastMessage(`Seat ${seat} is already booked!`);
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
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

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
{/* Sidebar with Glassmorphic Effect (Vertical, Compact & Wider) */}
<div className="flex flex-col gap-4 w-48 md:w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-3 md:p-4 shadow-xl flex-shrink-0">

  {/* Show Timings */}
  <div>
    <h3 className="text-lg md:text-xl font-bold text-red-400 mb-3 text-center tracking-wider drop-shadow-md">
      Show Timings 🎬
    </h3>
    {showTimings.map((time) => (
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
  </div>

  {/* Seat Legend */}
  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-md border border-white/20">
    <h4 className="text-red-400 font-bold mb-2 text-center drop-shadow-md text-sm md:text-base">Legend</h4>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-black border-2 border-red-600 rounded-md shadow-inner"></div>
        <span className="text-xs md:text-sm text-white">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-600 to-red-800 rounded-md shadow-md"></div>
        <span className="text-xs md:text-sm text-white">Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-700 rounded-md shadow-inner"></div>
        <span className="text-xs md:text-sm text-white">Booked</span>
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
                onSeatClick={(seat) => handleSeatClick(seat, bookedSeats[selectedTime])}
              />
            ) : (
              <p className="text-gray-300 mt-10 text-center md:mt-20">Select a show timing first</p>
            )}
          </div>
        </div>

        {/* Selected Seats & Booking */}
        {selectedSeats.length > 0 && selectedTime && (
          <div className="mt-6 text-center">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Your Selection:</h3>
            <p className="text-sm md:text-base">
              Time: {selectedTime} | Seats: {selectedSeats.join(", ")}
            </p>
            <button
              onClick={handleBooking}
              className="mt-4 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded-full hover:scale-105 transition transform"
            >
              Book Tickets
            </button>
          </div>
        )}

        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
      </main>
    </div>
  );
}
