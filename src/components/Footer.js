import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-[#0d1117] text-white px-6 py-12 md:px-20">
      <div className="flex flex-col md:flex-row justify-between">

        {/* Footer Left */}
        <div className="footer-left md:w-2/5 text-center md:text-left mb-10 md:mb-0">
          <img
            src="/logo512.png"
            alt="TicketWala"
            className="mx-auto md:mx-0 w-24 h-24 rounded-full mb-4"
          />
          <h3 className="text-3xl font-bold mb-4">TicketWala</h3>
          <nav aria-label="Footer Navigation">
            <p className="footer-links flex flex-wrap justify-center md:justify-start gap-3 mb-4 text-sm">
              <a href="/" className="hover:text-teal-500">Home</a>
              <a href="/movies" className="hover:text-teal-500">Movies</a>
              <a href="/new-release" className="hover:text-teal-500">New Release</a>
              <a href="/about" className="hover:text-teal-500">About</a>
              <a href="/contact" className="hover:text-teal-500">Contact</a>
            </p>
          </nav>
          <p className="text-teal-400 text-sm">
            &copy; 2025 TicketWala. All rights reserved.
          </p>
        </div>

        {/* Footer Center */}
        <div className="footer-center md:w-1/3 mb-10 md:mb-0 text-center md:text-left">
          <div className="flex items-center mb-3 justify-center md:justify-start">
            <FaMapMarkerAlt className="bg-gray-800 p-2 rounded-full text-xl mr-3" />
            <p>
              123 This is a Street, <br />
              A Locality, Region state, 12345
            </p>
          </div>
          <div className="flex items-center mb-3 justify-center md:justify-start">
            <FaPhone className="bg-gray-800 p-2 rounded-full text-xl mr-3" />
            <p>+1 234567890</p>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <FaEnvelope className="bg-gray-800 p-2 rounded-full text-xl mr-3" />
            <p>
              <a href="mailto:support@ticketwala.com" className="text-teal-400">support@ticketwala.com</a>
            </p>
          </div>
        </div>

        {/* Footer Right */}
        <div className="footer-right md:w-1/5 text-center md:text-left">
          <p className="footer-about text-gray-400 mb-4">
            <span className="block text-white font-bold mb-2">About this site</span>
            TicketWala is your premier online movie booking platform. Book your tickets quickly and easily.
          </p>
          <div className="footer-socials flex justify-center md:justify-start space-x-3 text-2xl">
            <a href="#" className="hover:text-teal-400"><FaFacebook /></a>
            <a href="#" className="hover:text-teal-400"><FaTwitter /></a>
            <a href="#" className="hover:text-teal-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-teal-400"><FaGithub /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
