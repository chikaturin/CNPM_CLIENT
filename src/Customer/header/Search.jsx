import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "../../assets/introPic.png";
import debounce from "lodash/debounce";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const [diemKhoiHanh, setDiemKhoiHanh] = useState("");
  const [diemKetThuc, setDiemKetThuc] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [suggestions, setSuggestions] = useState({
    sanBays: [],
    tramDungs: [],
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAirportSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/SuggestsAirpost?query=${query}`
      );
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        sanBays: response.data.sanBays,
      }));
    } catch (err) {
      setError("Lỗi khi lấy gợi ý sân bay: " + err.message);
    }
  };

  const fetchTramDungSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/SuggestsTramDung?query=${query}`
      );
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        tramDungs: response.data.tramDungs,
      }));
    } catch (err) {
      setError("Lỗi khi lấy gợi ý trạm dừng: " + err.message);
    }
  };

  const debouncedFetchAirportSuggestions = debounce(
    fetchAirportSuggestions,
    300
  );
  const debouncedFetchTramDungSuggestions = debounce(
    fetchTramDungSuggestions,
    300
  );

  const handleSuggestionClick = (suggestion, type) => {
    if (type === "sanBays") {
      setDiemKhoiHanh(suggestion);
      setSuggestions({ sanBays: [], tramDungs: [] });
    } else if (type === "tramDungs") {
      setDiemKetThuc(suggestion);
      setSuggestions({ sanBays: [], tramDungs: [] });
    }
  };

  const handleSubmit = async () => {
    if (!diemKhoiHanh || !diemKetThuc || !selectedDate || !selectedHour) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (selectedDate <= new Date().toISOString().split("T")[0]) {
      alert("Vui lòng chọn ngày lớn hơn ngày hiện tại");
      return;
    }
    if (selectedHour <= new Date().toISOString().split("T")[1].split(".")[0]) {
      alert("Vui lòng chọn giờ lớn hơn giờ hiện tại");
      return;
    }

    try {
      const tramDungResponse = await axios.get(
        `http://localhost:3000/api/TramDungByDiaChi?diaChi=${encodeURIComponent(
          diemKetThuc
        )}`
      );

      const tramDungs = tramDungResponse.data.tramDungs || [];

      if (tramDungs.length === 0) {
        alert("Không tìm thấy trạm dừng phù hợp");
        return;
      }

      const IDTramS = tramDungs[0]._id; // Assuming the first item is what you need

      // Navigate to BookingCar component with query parameters
      navigate(
        `/BookingCar?SanBay=${encodeURIComponent(
          diemKhoiHanh
        )}&Date=${encodeURIComponent(selectedDate)}&Time=${encodeURIComponent(
          selectedHour
        )}&IDTram=${IDTramS}`
      );
    } catch (err) {
      console.error("Error fetching tram data:", err.response || err.message);
      setError("Lỗi khi lấy trạm dừng: " + err.message);
    }
  };

  return (
    <div
      className="h-auto bg-cover w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" mx-auto pt-12 container pb-20">
        <div className=" h-fit bg-white rounded-xl justify-center grid grid-cols-6 w-full ">
          <div className=" h-fit p-5 w-full">
            <div className=" ">
              <label className="text-black font-bold flex mb-2 items-center space-x-2">
                Từ sân bay
              </label>
              <div className="flex relative">
                <span className="pl-1 absolute top-2">
                  <FontAwesomeIcon icon={faPlaneDeparture} />
                </span>
                <input
                  type="text"
                  value={diemKhoiHanh}
                  onChange={(e) => {
                    setDiemKhoiHanh(e.target.value);
                    debouncedFetchAirportSuggestions(e.target.value);
                  }}
                  className="w-full bg-slate-100 outline-none pl-8 border-black rounded-lg p-2"
                  placeholder="Sân bay khởi hành"
                />
              </div>
              <ul className=" bg-white w-full overflow-auto mt-4">
                {suggestions.sanBays.map((sanBay, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(sanBay, "sanBays")}
                  >
                    {sanBay}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <span className="w-full text-center pb-6 mt-11  text-3xl pr-9 translate-y-2">
            ⇌
          </span>
          <div className=" h-fit pt-5 pr-5 w-full">
            <div className=" ">
              <label className="text-black font-bold flex mb-2 items-center space-x-2">
                Đến khu vực địa chỉ
              </label>
              <div className="flex relative">
                <span className="pl-1 absolute top-2">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <input
                  type="text"
                  value={diemKetThuc}
                  onChange={(e) => {
                    setDiemKetThuc(e.target.value);
                    debouncedFetchTramDungSuggestions(e.target.value);
                  }}
                  className="w-full bg-slate-100 outline-none pl-8 border-black rounded-lg p-2"
                  placeholder="Đến khu vực địa chỉ tòa nhà"
                />
              </div>
              <ul className=" bg-white w-full overflow-auto mt-4">
                {suggestions.tramDungs.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(suggestion, "tramDungs")
                    }
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <label className="text-black pl-2 font-bold flex mb-2 items-center space-x-2">
              Ngày khởi hành
            </label>
            <div className="items-center h-fit w-3/4 px-2 py-[6px] mx-2 bg-gray-200 shadow rounded-lg">
              <input
                type="date"
                className="bg-transparent w-full h-fit outline-none text-center"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="text-black pl-2 font-bold flex mb-2 items-center space-x-2">
              Giờ khởi hành
            </label>
            <div className="items-center flex justify-center h-fit w-3/4 px-2 py-[6px] mx-2 bg-gray-200 shadow rounded-lg">
              <input
                type="time"
                className="bg-transparent w-full h-fit outline-none text-center"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center h-fit mt-[50px]">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;