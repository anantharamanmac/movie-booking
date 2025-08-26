// Navbar.js
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideSides, setHideSides] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    const userData = JSON.parse(localStorage.getItem("user")) || { name: "User" };

    if (token) {
      setUser(userData);
      setIsAdmin(adminFlag);
    }

    const handleScroll = () => setHideSides(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center w-full lg:w-4/5 mx-auto px-4 py-3 relative">
        {/* Logo */}
        <div className={`transition-opacity duration-500 ${hideSides ? "opacity-0" : "opacity-100"}`}>
          <h1 className="text-2xl font-bold text-red-600 drop-shadow-md">🎫 TicketWala</h1>
        </div>

        {/* Center Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-6 backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl px-6 py-2 shadow-lg">
          <Link to="/" className="text-white/90 hover:text-red-600 transition font-medium">Home</Link>
          <Link to="/movies" className="text-white/90 hover:text-red-600 transition font-medium">Movies</Link>
          <Link to="/movies" className="text-white/90 hover:text-red-600 transition font-medium">New Release</Link>
          {isAdmin && (
            <Link to="/admin/movies" className="text-white/90 hover:text-red-600 transition font-medium">Admin Dashboard</Link>
          )}
        </div>

        {/* Profile */}
        <div ref={dropdownRef} className={`transition-opacity duration-500 ${hideSides ? "opacity-0" : "opacity-100"} relative`}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-red-600 hover:text-red-800 transition text-2xl">
            <FaUserCircle />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg py-2 flex flex-col z-50">
              {user ? (
                <>
                  <Link to="/profile" className="px-4 py-2 hover:bg-white/50 text-red-600 font-medium">Profile</Link>
                  {isAdmin && <Link to="/admin/movies" className="px-4 py-2 hover:bg-white/50 text-red-600 font-medium">Admin Dashboard</Link>}
                  <button onClick={handleLogout} className="px-4 py-2 hover:bg-white/50 text-red-600 font-medium text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 hover:bg-white/50 text-red-600 font-medium">Login</Link>
                  <Link to="/signup" className="px-4 py-2 hover:bg-white/50 text-red-600 font-medium">Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center bg-black px-4 py-3">
        <h1 className="text-2xl font-bold text-red-600">🎫 TicketWala</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX className="text-2xl text-red-600" /> : <HiMenu className="text-2xl text-red-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black w-full py-4 flex flex-col items-center z-40">
          <Link to="/" className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Home</Link>
          <Link to="/movies" className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Movies</Link>
          {isAdmin && <Link to="/admin/movies" className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Admin Dashboard</Link>}
          {!user ? (
            <>
              <Link to="/login" className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Login</Link>
              <Link to="/signup" className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Profile</Link>
              <button onClick={handleLogout} className="w-full text-center py-2 text-red-600 font-medium hover:bg-red-700/30 rounded-lg">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
