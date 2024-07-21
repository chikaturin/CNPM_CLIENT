import React from "react";

const Header = ({ setShowNav }) => {
  const handleClick = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <button
        className="text-2xl font-bold cursor-pointer"
        onClick={handleClick}
      >
        Header
      </button>
    </div>
  );
};

export default Header;
