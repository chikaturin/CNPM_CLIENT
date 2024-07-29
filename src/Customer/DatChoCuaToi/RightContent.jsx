import listIcon from "../../assets/user-booking-ic.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Ads from "./ads";
function RightContent() {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const [lichSuCar, setLichSuCar] = useState([]);
  const [lichSuTau, setLichSuTau] = useState([]);
  const [lichSuBus, setLichSuBus] = useState([]);
  const currentMaKH = "KH01"; //TODO thay thế mã bằng giá trị động từ khách hàng đăng nhập
  const filteredLichSuCar = lichSuCar.filter(
    (item) => item.MaKH === currentMaKH
  ); // Lọc lịch sử đặt xe theo mã khách hàng hiện tại
  const filteredLichSuTau = lichSuTau.filter(
    (item) => item.MaKH === currentMaKH
  ); 
  const filteredLichSuBus = lichSuBus.filter(
    (item) => item.MaKH === currentMaKH
  ); 
   const navigate = useNavigate();

   //get ls xe
  useEffect(() => {
    const getLichSuDatXe = async () => {
      try {
        const res = await axios.get(
          `${url}/GetLichSuDatXeOto`,
          { params: { MaKH: currentMaKH } } //TODO Nếu Controller API không hỗ trợ thì xóa dòng này
        );
        console.log(res.data);
        setLichSuCar(res.data.lichSuDatXeOto);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
      }
    };
    getLichSuDatXe();
  }, [url, currentMaKH]);

  // get ls Tau
  useEffect(() => {
    const getLichSuDatTau= async () => {
      try {
        const res = await axios.get(
          `${url}/GetLichSuDatTau`,
          { params: { MaKH: currentMaKH } } //TODO Nếu Controller API không hỗ trợ thì xóa dòng này
        );
        console.log(res.data);
        setLichSuTau(res.data.lichSuDatTau);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
      }
    };
    getLichSuDatTau();
  }, [url, currentMaKH]);

  // get ls Bus
  useEffect(() => {
    const getLichSuDatBus= async () => {
      try {
        const res = await axios.get(
          `${url}/GetHistoryBus`,
          { params: { MaKH: currentMaKH } } //TODO Nếu Controller API không hỗ trợ thì xóa dòng này
        );
        console.log(res.data);
        setLichSuBus(res.data.lichSuDatXeBus);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
      }
    };
    getLichSuDatBus();
  }, [url, currentMaKH]);

  const handleSubmitCar = (maDX,id) => {
    navigate(`/CancelTicket?MaDX=${encodeURIComponent(maDX)}&id=${encodeURIComponent(id)}`);
  }
  const handleSubmitBus = (maDX,id) => {
    navigate(`/CancelTicketBus?MaDX=${encodeURIComponent(maDX)}&id=${encodeURIComponent(id)}`);
  }
  const handleSubmitTau = (maDX,id) => {
    navigate(`/CancelTicketTau?MaDX=${encodeURIComponent(maDX)}&id=${encodeURIComponent(id)}`);
  }
  return (
    <div className="w-[70%] mt-10 h-[600px] overflow-y-auto">
      
      <Ads />
      {/* <div className=" w-full shadow bg-[#EDEDED] rounded-lg mb-8">
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
      </div> */}

      <h2 className="font-bold text-2xl">Vé điện tử & Phiếu thanh toán hiện hành</h2>
      <div></div>
      {filteredLichSuCar.map((item) => (
        <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
          <div className="items-center p-4 mt-4">
            <h2 className="font-bold text-xl">
              Từ sân bay quốc tế tân sơn nhất
            </h2>
            <div className="flex my-1">
              <p>Mã đặt chỗ Xe của traveloki</p>
              <p className="ml-1 font-bold ">{item.MaDX}</p>
            </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="flex">
              <div className="bg-blue-900 text-white rounded-full my-1 py-1 px-4">Trạng thái thanh toán</div>
              <div className="ml-auto font-semibold text-blue-800 cursor-pointer hover:text-blue-800" onClick={() => handleSubmitCar(item.MaDX,item._id)}>
                Xem chi tiết
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredLichSuTau.map((item) => (
        <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
          <div className="items-center p-4 mt-4">
            <h2 className="font-bold text-xl">
              Từ sân bay quốc tế tân sơn nhất
            </h2>
            <div className="flex my-1">
              <p>Mã đặt chỗ Tàu của traveloki</p>
              <p className="ml-1 font-bold ">{item.MaDX}</p>
            </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="flex">
              <div className="bg-blue-900 text-white rounded-full my-1 py-1 px-4">Trạng thái thanh toán</div>
              <div className="ml-auto font-semibold text-blue-600 cursor-pointer hover:text-blue-800" onClick={() => handleSubmitTau(item.MaDX,item._id)}>
                Xem chi tiết
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredLichSuBus.map((item) => (
        <div key={item._id} className="w-full shadow bg-[#EDEDED] rounded-lg">
          <div className="items-center p-4 mt-4">
            <h2 className="font-bold text-xl">
              Từ sân bay quốc tế tân sơn nhất
            </h2>
            <div className="flex my-1">
              <p>Mã đặt chỗ Bus của traveloki</p>
              <p className="ml-1 font-bold ">{item.MaDX}</p>
            </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="flex">
              <div className="bg-blue-900 text-white rounded-full my-1 py-1 px-4">Trạng thái thanh toán</div>
              <div className="ml-auto font-semibold text-blue-600 cursor-pointer hover:text-blue-800" onClick={() => handleSubmitBus(item.MaDX,item._id)}>
                Xem chi tiết
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RightContent;
