import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // replace with your key if different
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Movies
export const getMovies = () =>
  axios.get(`${BASE_URL}/movies`, { headers: getAuthHeaders() });

export const addMovie = (data) =>
  axios.post(`${BASE_URL}/movies`, data, { headers: getAuthHeaders() });

export const updateMovie = (id, data) =>
  axios.put(`${BASE_URL}/movies/${id}`, data, { headers: getAuthHeaders() });

export const deleteMovie = (id) =>
  axios.delete(`${BASE_URL}/movies/${id}`, { headers: getAuthHeaders() });

// Theaters
export const getTheaters = () =>
  axios.get(`${BASE_URL}/theaters`, { headers: getAuthHeaders() });
export const addTheater = (data) =>
  axios.post(`${BASE_URL}/theaters`, data, { headers: getAuthHeaders() });
export const updateTheater = (id, data) =>
  axios.put(`${BASE_URL}/theaters/${id}`, data, { headers: getAuthHeaders() });
export const deleteTheater = (id) =>
  axios.delete(`${BASE_URL}/theaters/${id}`, { headers: getAuthHeaders() });

// Shows
export const getShows = () =>
  axios.get(`${BASE_URL}/shows`, { headers: getAuthHeaders() });
export const addShow = (data) =>
  axios.post(`${BASE_URL}/shows`, data, { headers: getAuthHeaders() });
export const updateShow = (id, data) =>
  axios.put(`${BASE_URL}/shows/${id}`, data, { headers: getAuthHeaders() });
export const deleteShow = (id) =>
  axios.delete(`${BASE_URL}/shows/${id}`, { headers: getAuthHeaders() });

// Tickets
export const getTickets = () =>
  axios.get(`${BASE_URL}/tickets`, { headers: getAuthHeaders() });
