import React from "react";

const SeatSelector = ({
  rows = 8,
  cols = 10,
  selectedSeats,
  onSelect,
  bookedSeats = [],
  onSeatClick,
}) => {
  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-black text-white w-full">
      {/* Screen SVG with centered text */}
      <div className="relative w-full sm:w-3/4 mb-6 sm:mb-8">
        <svg
          viewBox="0 0 585 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M585 29V17C585 17 406.824 0 292.5 0C178.176 0 0 17 0 17V29C0 29 175.5 12 292.5 12C404.724 12 585 29 585 29Z"
            fill="#F84565"
            fillOpacity="0.3"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-sm sm:text-base drop-shadow-lg">
          SCREEN
        </div>
      </div>

      {/* Seats */}
      <div className="space-y-2 sm:space-y-4">
        {rowLabels.slice(0, rows).map((row) => (
          <div key={row} className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {Array.from({ length: cols }, (_, i) => {
              const seat = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seat);
              const isBooked = bookedSeats.includes(seat);

              return (
                <button
                  key={seat}
                  onClick={() => onSeatClick(seat)}
                  className={`w-7 h-7 sm:w-10 sm:h-10 rounded-md border text-[9px] sm:text-xs font-bold transition
                    ${isBooked ? "bg-gray-700 text-gray-400 cursor-not-allowed" : ""}
                    ${isSelected ? "bg-gradient-to-r from-red-500 to-red-700 text-white" : "bg-black text-white hover:bg-red-600"}`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
