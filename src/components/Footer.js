import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 Movie Booking. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="/" className="hover:text-yellow-400">Home</a>
          <a href="/about" className="hover:text-yellow-400">About</a>
          <a href="/contact" className="hover:text-yellow-400">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
