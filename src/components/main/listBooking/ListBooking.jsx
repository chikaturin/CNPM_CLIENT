import bgMain from "../../../assets/bgMain.png";
import Car from "../../../assets/Car.png";
import Bus from "../../../assets/Bus.png";
import Train from "../../../assets/Train.png";
import NiceService from "../../../assets/NiceService.png";
import check from "../../../assets/check.png";
import vehicle from "../../../assets/Vehicle.png";
import brandVehicle from "../../../assets/BrandVehicle.png";
import icUserGray from "../../../assets/icUserGray.png";
import baggages from "../../../assets/Baggages.png";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com";

export const ListBooking = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const [dataCar, setDataCar] = useState([]);
  //Xử lý data xe
  useEffect(() => {
    const getListCar = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/GetDetailCar`);
        console.log(res.data);
        setDataCar(res.data.chiTietXeOto);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
      }
    };
    getListCar();
  }, []);

  return (
    <section
      className=" py-12 bg-white -mt-14 rounded-tl-3xl rounded-tr-3xl"
      style={{ backgroundImage: `url(${bgMain})`, backgroundSize: "cover" }}
    >
      <div className="container max-w-screen-lg mx-auto ">
        {/* Locate */}
        <div className="container mx-auto flex justify-between border-b-2 border-gray-200 py-8">
          <div className="max-w-4xl ml-12">
            <h2 className="text-3xl font-semibold break-words whitespace-normal">
              From Tan Son Nhat International Airport - International Arrival
              Gate (SGN)
            </h2>
            <p>Thứ tư, 03 tháng 07 2024 | 22:25</p>
          </div>
          <div className="flex items-center mr-12">
            <button className="border border-white text-white px-4 py-2 rounded-lg shadow bg-blue-800">
              Thay đổi tìm kiếm
            </button>
          </div>
        </div>
        {/* Vehicle */}
        <div className="container  mx-auto flex rounded-lg my-10 bg-white shadow p-6 ml-12">
          <div className="flex items-center ml-12">
            <img className="w-4 h-4" src={Car} alt="Car"></img>
            <div className="text-2xl px-2 font-bold text-blue-800">Car</div>
          </div>
          <div className="flex items-center ml-12">
            <img className="w-4 h-4" src={Train} alt="Car"></img>
            <div className="text-2xl px-2 font-bold text-blue-800">
              Airport Train
            </div>
          </div>
          <div className="flex items-center ml-12">
            <img className="w-4 h-4" src={Bus} alt="Car"></img>
            <div className="text-2xl px-2 font-bold text-blue-800">
              Shuttle Bus
            </div>
          </div>
        </div>
        {/* Advantage */}
        <div className="container mx-auto flex items-center ml-12 relative">
          <div className="absolute top-0 left-0">
            <img src={NiceService} alt="NiceService"></img>
          </div>
          <div className="h-24 w-18"></div>
          <div className="flex ml-10 bg-blue-900 w-full">
            <div className="flex items-center ml-20 p-6 text-white">
              <img className="w-4 h-4" src={check} alt="Car"></img>
              Avaliable 24 hours
            </div>
            <div className="flex items-center ml-8 p-6 text-white">
              <img className="w-4 h-4" src={check} alt="Car"></img>
              Convenient pick-up point
            </div>
            <div className="flex items-center ml-8 p-6 text-white">
              <img className="w-4 h-4" src={check} alt="Car"></img>
              All-inclusive price
            </div>
          </div>
        </div>
        {/*List Vehicle */}
        {dataCar.map((car,index) => (
          <div key = {index} className="container flex justify-between mx-auto rounded-lg my-10 bg-white shadow p-6 ml-12">
            <div className="flex">
              <div>
                <img src={car.Image} alt="Car"></img>
                <div className="w-full flex justify-center">
                  <img className="" src={brandVehicle} alt="Brand"></img>
                </div>
              </div>
              <div className="flex flex-col justify-between px-4">
                <div>
                  <div className="flex">
                    <p className="font-bold">{car.TenHangXe}</p>
                    <p className="font-medium text-gray-500 px-1">(Standard)</p>
                  </div>
                  <p className="font-thin text-gray-500">
                    {car.CongTy}
                  </p>
                  <div className="flex">
                    <div className="flex items-center">
                      <img className="h-4 w-4" src={icUserGray} alt="User"></img>
                      <p className="font-thin text-gray-500 px-1" >
                      {car.SoGheToiDa} passenger(s)
                      </p>
                    </div>
                    <div className="flex items-center px-4">
                      <img className="h-4 w-4" src={baggages} alt="User"></img>
                      <p className="font-thin text-gray-500 px-1">{car.SoHanhLyToiDa} baggage(s)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto font-bold" onClick={handleToggleDetails}>
                  Chi tiết xe
                </div>
              </div>
            </div>
            <div className="mr-4">
              <div className="font-bold text-blue-800 py-1">264.196 VND/car</div>
              <button className="border w-44 border-white text-white p-3 rounded-lg shadow bg-blue-800">
                Chọn
              </button>
            </div>
          </div>
          
        ))};


        <div className="container flex justify-between mx-auto rounded-lg my-10 bg-white shadow p-6 ml-12">
          <div className="flex">
            <div>
              <img src={vehicle} alt="Car"></img>
              <div className="w-full flex justify-center">
                <img className="" src={brandVehicle} alt="Brand"></img>
              </div>
            </div>
            <div className="flex flex-col justify-between px-4">
              <div>
                <div className="flex">
                  <p className="font-bold">Compact</p>
                  <p className="font-medium text-gray-500 px-1">(Standard)</p>
                </div>
                <p className="font-thin text-gray-500">
                  SHOGIE TRANS INDONESIA Jakarta AT
                </p>
                <div className="flex">
                  <div className="flex items-center">
                    <img className="h-4 w-4" src={icUserGray} alt="User"></img>
                    <p className="font-thin text-gray-500 px-1">
                      2 passenger(s)
                    </p>
                  </div>
                  <div className="flex items-center px-4">
                    <img className="h-4 w-4" src={baggages} alt="User"></img>
                    <p className="font-thin text-gray-500 px-1">2 baggage(s)</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto font-bold" onClick={handleToggleDetails}>
                Chi tiết xe
              </div>
            </div>
          </div>
          <div className="mr-4">
            <div className="font-bold text-blue-800 py-1">264.196 VND/car</div>
            <button className="border w-44 border-white text-white p-3 rounded-lg shadow bg-blue-800">
              Chọn
            </button>
          </div>
        </div>
        {showDetails && (
          <div className="mt-4 p-4 border-t border-gray-200">
            {/* Nội dung chi tiết xe */}
            <p>Thông tin chi tiết về xe...</p>
          </div>
        )}
        <div className="container flex justify-between mx-auto rounded-lg my-10 bg-white shadow p-6 ml-12">
          <div className="flex">
            <div>
              <img src={vehicle} alt="Car"></img>
              <div className="w-full flex justify-center">
                <img className="" src={brandVehicle} alt="Brand"></img>
              </div>
            </div>
            <div className="flex flex-col justify-between px-4">
              <div>
                <div className="flex">
                  <p className="font-bold">Compact</p>
                  <p className="font-medium text-gray-500 px-1">(Standard)</p>
                </div>
                <p className="font-thin text-gray-500">
                  SHOGIE TRANS INDONESIA Jakarta AT
                </p>
                <div className="flex">
                  <div className="flex items-center">
                    <img className="h-4 w-4" src={icUserGray} alt="User"></img>
                    <p className="font-thin text-gray-500 px-1">
                      2 passenger(s)
                    </p>
                  </div>
                  <div className="flex items-center px-4">
                    <img className="h-4 w-4" src={baggages} alt="User"></img>
                    <p className="font-thin text-gray-500 px-1">2 baggage(s)</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto font-bold" onClick={handleToggleDetails}>
                Chi tiết xe
              </div>
            </div>
          </div>
          <div className="mr-4">
            <div className="font-bold text-blue-800 py-1">264.196 VND/car</div>
            <button className="border w-44 border-white text-white p-3 rounded-lg shadow bg-blue-800">
              Chọn
            </button>
          </div>
        </div>
        {showDetails && (
          <div className="mt-4 p-4 border-t border-gray-200">
            {/* Nội dung chi tiết xe */}
            <p>Thông tin chi tiết về xe...</p>
          </div>
        )}
      </div>
    </section>
  );
};
