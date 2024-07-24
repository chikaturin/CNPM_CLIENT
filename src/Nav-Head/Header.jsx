import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Header = ({ setShowNav }) => {
  const handleClick = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };
  const handleLogout = () => {
    localStorage.removeItem("checkadmin");

    // Redirect to the login or home page
    navigate("/");
  };
  return (
    <div className="bg-gray-800 pl-9 text-white p-4 flex justify-between items-center">
      <button
        className="text-2xl font-bold cursor-pointer"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <a href="/">
        <button
          onClick={handleLogout}
          className="text-2xl font-bold cursor-pointer"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </a>
    </div>
  );
};

export default Header;
