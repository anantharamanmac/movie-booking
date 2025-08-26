import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
