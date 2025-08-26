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
      {/* Screen */}
      <div className="w-full sm:w-3/4 h-3 sm:h-4 rounded-t-full mb-6 sm:mb-8 relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-red-700 via-red-900 to-red-700 rounded-t-full shadow-lg" />
        <div className="absolute w-full text-center top-1/2 transform -translate-y-1/2 text-gray-200 text-xs sm:text-sm">
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
