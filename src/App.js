import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin pages
import AdminLayout from "./components/admin/AdminLayout";
import MoviesAdmin from "./pages/admin/MoviesAdmin";
import TheatersAdmin from "./pages/admin/TheatersAdmin";
import ShowsAdmin from "./pages/admin/ShowsAdmin";
import TicketsAdmin from "./pages/admin/TicketsAdmin";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import { LoaderProvider, useLoader } from "./contexts/LoaderContext";
import Loader from "./components/Loader";


function AppContent() {
  const { loading } = useLoader();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col relative">
      {loading && <Loader />}
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} /> {/* movie details page */}
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin dashboard routes (protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="movies" element={<MoviesAdmin />} />
            <Route path="theaters" element={<TheatersAdmin />} />
            <Route path="shows" element={<ShowsAdmin />} />
            <Route path="tickets" element={<TicketsAdmin />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LoaderProvider>
      <Router>
        <AppContent />
      </Router>
    </LoaderProvider>
  );
}

export default App;
