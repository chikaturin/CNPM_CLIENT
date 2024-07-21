import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="bg-custom-gradient w-1/4 p-0 m-0 h-screen">
      <div className="text-center justify-center translate-x-1/2 pt-3 font-bold w-1/2">
        <div className="bg-white px-3 py-2 rounded-md">
          <h1 className="font-extrabold text-black">ADMIN</h1>
        </div>
      </div>
      <h1 className="font-extrabold text-white text-center pt-4">
        DANH MỤC QUẢN LÝ
      </h1>
      <div className="p-4">
        <ul>
          <li>
            <a
              href="/"
              className="route text-white font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faPlane} /> Danh sách sân bay
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
