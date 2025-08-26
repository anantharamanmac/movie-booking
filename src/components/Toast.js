import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // auto-close after 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-white/90 to-white/80 text-red-600 px-6 py-3 rounded-2xl shadow-2xl border border-red-400 flex items-center gap-3 animate-toast z-50">
      {/* Optional close icon */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Toast;
