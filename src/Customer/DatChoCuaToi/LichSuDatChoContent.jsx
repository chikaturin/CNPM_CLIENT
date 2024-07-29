import { useEffect, useState } from "react";
import listIcon from "../../assets/user-booking-ic.svg";
import axios from "axios";

function LichSuDatChoContent() {
    const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
    const [showLichSuOto,setShowLichSuOto] = useState([]);
    const [showLichSuDatTau,setShowLichSuDatTau] = useState([]);
    const [showLichSuXeBus,setShowLichSuXeBus] = useState([]);

  useEffect(() => {
    const getLichSuOto = async () => {
        try {
            const res = await axios.get(`${url}/GetLichSuDatXeOto`);
            console.log(res.data);
            setShowLichSuOto(res.data.lichSuDatXeOto);
        } catch (error) {
            console.error(
            "Request failed with status code",
            error.response?.status
            );
        }
    }
    const getLichSuTau = async () => {
        try {
            const res = await axios.get(`${url}/GetLichSuDatTau`);
            console.log(res.data);
            setShowLichSuDatTau(res.data.lichSuDatTau);
        } catch (error) {
            console.error(
            "Request failed with status code",
            error.response?.status
            );
        }
    }
    const getLichSuBus = async () => {
        try {
            const res = await axios.get(`${url}/GetLichSuXeBus`);
            console.log(res.data);
            setShowLichSuXeBus(res.data.lichSuDatXeBus);
        } catch (error) {
            console.error(
            "Request failed with status code",
            error.response?.status
            );
        }
    }
    getLichSuOto();
    getLichSuTau();
    getLichSuBus();
  }, []);


  
  return (
    <div className="w-[70%] mt-10">
      <div className="w-full shadow bg-[#EDEDED] rounded-lg">
        <div className="inline-flex items-center p-4">
          <div className="mr-4">
            <img
              src={listIcon}
              alt="Avatar"
              className="w-[32px] h-[32px] rounded-full"
            />
          </div>
          <div className="font-semibold text-lg">
            Xem tất cả vé máy bay và phiếu thanh toán trong{" "}
            <a path="#" className="text-[#1D4886]">
              Đặt chỗ của tôi
            </a>
          </div>
        </div>
      </div>
      <div className="w-full shadow bg-[#EDEDED] rounded-lg">
        <div className="items-center p-4 mt-4">
          <div className="flex justify-center items-center">
            <h2 className="font-semibold text-xl">Lịch sử</h2>
          </div>
          <div className="flex items-center">
            <button className="ml-4 bg-[#1D4886] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Đặt xe
            </button>
            <button className="ml-4 bg-[#1D4886] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Đặt bus
            </button>
            <button className="ml-4 bg-[#1D4886] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Đặt tàu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LichSuDatChoContent;
