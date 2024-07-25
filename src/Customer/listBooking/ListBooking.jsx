import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faBus,
  faTrain,
  faUser,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import listbookign from "../../assets/listbooking.png";
import { useSearchParams, useNavigate } from "react-router-dom";

const ListBooking = () => {
  const navigate = useNavigate();
  const [detailCar, setDetailCar] = useState([]);
  const [selected, setSelected] = useState("Car");
  const [fetchError, setFetchError] = useState(null);
  const [searchParams] = useSearchParams();

  const SanBay = searchParams.get("SanBay") || "Default San Bay";
  const Date = searchParams.get("Date") || "Default Date";
  const Time = searchParams.get("Time") || "Default Time";
  const IDTram = searchParams.get("IDTram") || "Default IDTram";
  const MaSB = searchParams.get("MaSB") || "";

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleClick = (option) => {
    setSelected(option);
  };

  const fetchDetailCar = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/FindDetailCarID?MaSB=${MaSB}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setDetailCar(result.detailCars || []);
    } catch (e) {
      console.error("Error fetching detail car:", e);
      setFetchError("Failed to load details. Please try again later.");
    }
  };

  const handleSubmit = (detailCarID) => {
    navigate(
      `/BookingCar?SanBay=${encodeURIComponent(
        SanBay
      )}&Date=${encodeURIComponent(Date)}&Time=${encodeURIComponent(
        Time
      )}&IDTram=${IDTram}&DetailCarID=${detailCarID}`
    );
  };

  useEffect(() => {
    if (MaSB) {
      fetchDetailCar();
    }
  }, [MaSB]);

  return (
    <div className="w-[85%] h-full mx-auto container">
      <div className="relative">
        <div className="absolute p-16">
          <p className="text-white font-extrabold text-2xl">
            Đến sân bay không còn mệt mỏi
          </p>
          <p className="w-1/2 text-white">
            Biến chuyến đi đến và từ sân bay đi trở nên tiện lợi nhất có thể!
            Với nhiều lựa chọn phương tiện phù hợp với nhu cầu của bạn, hãy đặt
            ngay xe đưa đón sân bay hôm nay để bớt đi một nỗi lo nhé.
          </p>
        </div>
        <img
          src="https://ik.imagekit.io/tvlk/image/imageResource/2018/10/08/1538999958318-bb50c036ab44378f08d0d3b8020366c1.png?tr=dpr-2,q-75,w-960"
          alt="Background"
        />
      </div>

      <div className="w-full mx-auto flex border-b-2 pb-4">
        <div className="pt-9 w-3/4">
          <p className="font-extrabold text-3xl">From {SanBay} (CGK)</p>
          <span className="text-xl">
            {Date} | {Time}
          </span>
        </div>
        <div className="flex w-1/4 justify-end">
          <button className="font-bold bg-[#0094F3] w-fit h-fit p-2 text-white rounded-md mt-8">
            Change Search
          </button>
        </div>
      </div>

      <div className="flex w-full h-fit border mt-6 font-bold p-4 rounded-lg bg-white">
        <span
          onClick={() => handleClick("Car")}
          className={`cursor-pointer text-2xl px-2 ${
            selected === "Car"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faCar} /> Car
        </span>
        <span
          onClick={() => handleClick("Bus")}
          className={`mx-9 px-2 text-2xl cursor-pointer ${
            selected === "Bus"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faBus} /> Shuttle Bus
        </span>
        <span
          onClick={() => handleClick("Train")}
          className={`cursor-pointer text-2xl px-2 ${
            selected === "Train"
              ? "border-b-2 border-[#0094F3] text-[#0094F3]"
              : "text-gray-500"
          }`}
        >
          <FontAwesomeIcon icon={faTrain} /> Airport Train
        </span>
      </div>

      <img src={listbookign} alt="List Booking" />

      {fetchError && <div className="text-red-500">{fetchError}</div>}

      {detailCar.map((item) => (
        <div
          className="bg-white my-4 rounded-lg hover:border-green-500 border-2 transition-all duration-300"
          key={item._id}
        >
          <div className="flex">
            <img
              src={item.Image}
              className="w-auto h-44 rounded-s-lg"
              alt={item.TenHangXe}
            />

            <div className="grid w-full grid-cols-12 gap-4">
              <div className="p-4 col-span-7">
                <p className="text-4xl">
                  {item.TenHangXe}
                  <span className="text-2xl text-gray-500">(Standard)</span>
                </p>
                <p className="text-gray-500">{item.CongTy}</p>
                <span className="text-gray-300 mr-4">
                  <FontAwesomeIcon icon={faUser} /> {item.SoGheToiDa}
                </span>
                <span className="text-gray-300 mr-4">
                  <FontAwesomeIcon icon={faSuitcase} /> {item.SoHanhLyToiDa}
                </span>
              </div>
              <div className="col-span-5 p-4 mt-3 flex justify-end">
                <div>
                  <div className="w-fit">
                    <span className="text-lg text-orange-400">
                      {formatPrice(item.SoTien_1km)} VND/Km
                    </span>
                  </div>
                  <button
                    onClick={() => handleSubmit(item._id)}
                    className="bg-orange-500 w-full text-white font-bold rounded-lg p-2"
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBooking;
