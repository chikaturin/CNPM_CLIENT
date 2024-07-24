import React from "react";
import Headercus from "./Customer/header/Header";
import SearchBar from "./Customer/header/Search";
import MainHome from "./Customer/home/MainHome";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Customer = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Clear any authentication tokens or user data if necessary
    localStorage.removeItem("checkadmin"); // Example: Remove checkadmin from localStorage

    // Redirect to the login or home page
    navigate("/");
  };

  return (
    <div>
      <Headercus />
      <SearchBar />
      <Outlet />
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Customer;
