import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parse, format, differenceInMilliseconds, isSameDay } from "date-fns";

import {
  faPlaneArrival,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const CancelTicketBus = () => {
  const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const MaDX = searchParams.get("MaDX");
  const historyBusId = searchParams.get("id");
  const today = new Date().toISOString().slice(0, 16);
  const [detailBookingBus, setDetailBookingBus] = useState([]);
  const [detailBus, setDetailBus] = useState([]);
  const [maVeBus, setMaVeBus] = useState(null); 
  const [bookingId, setBookingId] = useState(null); // state để lưu id
  const [newNgayGioDat, setNewNgayGioDat] = useState("");

  // getDetailTicket && getDetailCar
  useEffect(() => {
    //get detail ticket
    const getDatXeMaDX = async () => {
      try {
        const res = await axios.get(`${url}/FindBuyTicketBusMaDX/${MaDX}`);
        console.log(res.data);
        setDetailBookingBus(res.data.buyTicketBus);

        // Giả sử chỉ có một đối tượng trong mảng datXes
        const MaDetailBus = res.data.buyTicketBus?.MaDetailBus;
        const MaVeBus = res.data.buyTicketBus?.MaVeBus;
        const id = res.data.buyTicketBus?._id; // Lấy id từ response
        setMaVeBus(MaVeBus);
        setBookingId(id); // Lưu id vào state
        if (MaDetailBus) {
          await getDetailBus(MaDetailBus);
        }
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
        console.log("Error: ", error);
      }
    };

    //get detail ticket
    const getDetailBus = async (MaDetailBus) => {
      try {
        const res = await axios.get(`${url}/GetPhuongTienID/${MaDetailBus}`);
        console.log("Detail Bus:", res.data);
        setDetailBus(res.data.phuongTien);
      } catch (error) {
        console.error(
          "Request failed with status code",
          error.response?.status
        );
        console.log("Error: ", error);
      }
    };

    if (MaDX) {
      getDatXeMaDX();
    }
  }, [MaDX]);

  //định dạng ngày giờ
  const formatDate = (dateString) => {
    try {
      const parsedDate = parse(dateString, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date());
      return format(parsedDate, "dd/MM/yyyy HH:m a");
    } catch (error) {
      console.error("Invalid Date:", dateString);
      return "Invalid Date";
    }
  };

  // kiểm tra giờ hợp lệ để hủy vé
  const canCancelTicket = () => {
    const currentTime = new Date();
    const bookingTime = new Date(detailBookingBus?.NgayGioKhoiHanh);
   // Kiểm tra nếu thời gian chuẩn bị đi còn ít hơn 1 tiếng và cùng ngày
   const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
   if (isSameDay(currentTime, bookingTime) && differenceInMinutes < 60) {
     return false;
   }

   return true;
  };

   // Hàm kiểm tra thời gian đổi lịch
   const canChangeBooking = () => {
    const currentTime = new Date();
    const bookingTime = new Date(detailBookingBus?.NgayGioKhoiHanh);
    // Kiểm tra nếu thời gian chuẩn bị đi còn ít hơn 2 tiếng mà cùng ngày thì không cho đổi
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    if (isSameDay(currentTime, bookingTime) && differenceInMinutes < 120) {
      return false;
    }

    return true;
  };

  // Hàm hủy vé
  const handleCancel = async () => {
    if (!canCancelTicket()) {
      alert("Không thể hủy vé vì thời gian chuẩn bị đi còn ít hơn 1 tiếng.");
    } else {
      // Thực hiện logic hủy vé ở đây
      try {
        const response = await axios.delete(`${url}/CancelBookingBus/${maVeBus}`);
        
        if (response.status === 200) {
          alert("Hủy vé thành công.");
          navigate("/my-booking");
        } else {
          alert("Có lỗi xảy ra khi hủy vé đặt xe.");
        }
      } catch (error) {
        console.error("Error cancelling ticket: ", error);
        alert("Có lỗi xảy ra khi hủy vé.");
      }
    }
  };


  // Hàm đổi lịch
  const handleChangeBooking = async () => {
    if (!canChangeBooking()) {
      alert("Không thể đổi lịch vì thời gian chuẩn bị đi còn ít hơn 4 tiếng.");
    } else {
    try {
      console.log("id:", bookingId);
      const response = await axios.put(`${url}/BuyTicketBus/SchedularChange/${bookingId}`, {
        NgayGioDat: newNgayGioDat,
      });
      const { message } = response.data;
      if (response.status === 200) {
        alert(message);
        navigate("/my-booking");
      } else {
        alert(message || "Có lỗi xảy ra khi đổi lịch.");
      }
    } catch (error) {
      console.error("Error changing schedule: ", error);
      alert("Có lỗi xảy ra khi đổi lịch.");
    }
    }
  };

  return (
    <div className="p-4 w-full h-full pb-28 overflow-y-auto">
      <span className="bg-white w-[96%] p-2 -top-0 absolute font-bold text-xl">
        <span className="font-extrabold text-green-500 px-4">
          {detailBookingBus?.DiemDon}
        </span>
        -
        <span className="font-extrabold text-green-500 px-4">
          {detailBookingBus?.DiemTra}
        </span>
      </span>
      <div className="w-full mt-8">
        <div className="flex text-gray-500">
        {detailBus?.TenCty}
        </div>
      </div>

      <div className="mt-2 bg-slate-100 p-4">
        <label className="font-bold">
          <span className="text-blue-500">○</span> Điểm sân bay
        </label>
        <div className="grid grid-cols-2 pl-4 ml-[5.3px] border-l-4">
          <div className="p-2">
            <label className="font-bold">Sân bay</label>
            <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faPlaneArrival} />
              <span className="ml-2">{detailBookingBus?.DiemDon}</span>
            </p>
            <label className="font-bold">Lịch đi</label>
            <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span className="ml-2">
                {detailBookingBus?.NgayGioKhoiHanh}
              </span>
            </p>
            <label className="font-bold">Nhập lịch muốn đổi</label>
            <input
              type="datetime-local"
              min={today}
              className="border mt-2 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2 w-full"
              value={newNgayGioDat}
              onChange={(e) => setNewNgayGioDat(e.target.value)}
            />
          </div>

          <div className="p-2">
            <label className="font-bold">Tên phương tiện</label>
            <input
              className="border mt-2 mb-4 outline-none text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2 w-full"
              type="text"
              name="Tên Phương Tiện"
              value={detailBus?.TenPhuongTien}
              disabled
            />
            <label className="font-bold">Số điện thoại</label>
            <input
              className="border mt-2 mb-4 outline-none text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2 w-full"
              type="text"
              placeholder="Nhập số điện thoại liên hệ"
              name="Sdt"
              disabled
            />
          </div>
        </div>
        <label className="font-bold">
          <span className="text-blue-500">●</span> Điểm đón-trả
        </label>
        <div className="p-2 pl-8">
          <p className="border mt-2 mb-4 text-slate-500 border-gray-500 bg-slate-50 rounded-md p-2">
            <FontAwesomeIcon icon={faPlaneArrival} />
            <span className="ml-2">{detailBookingBus?.DiemTra}</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 bg-white p-4 w-[96%]">
        <div className="flex float-left">
          <div className="text-center">
            <span
              className={
                detailBookingBus?.Trangthai
                  ? "text-gray-300 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              Chưa thanh toán
            </span>
            <span
              className={
                detailBookingBus?.Trangthai
                  ? "text-gray-300"
                  : "text-red-600"
              }
            >
              ●
            </span>
            <span
              className={`inline-block border-t-4 ${
                detailBookingBus[0]?.Trangthai
                  ? "border-gray-400"
                  : "border-red-600"
              } w-20 ml-1`}
            ></span>
            <span
              className={
                detailBookingBus?.Trangthai
                  ? "text-blue-500"
                  : "text-red-500"
              }
            >
              ●
            </span>
            <span
              className={`inline-block border-t-4 ${
                detailBookingBus[0]?.Trangthai
                  ? "border-blue-500"
                  : "border-gray-400"
              } w-20 mr-1`}
            ></span>
            <span
              className={
                detailBookingBus?.Trangthai
                  ? "text-blue-500"
                  : "text-gray-300"
              }
            >
              ●
            </span>
            <span
              className={
                detailBookingBus?.Trangthai
                  ? "text-blue-500 font-bold"
                  : "text-gray-300 font-bold"
              }
            >
              Đã thanh toán
            </span>
          </div>
        </div>
        <div className="flex float-right">
          <div className="w-fit">
            <p className="text-gray-500 text-sm text-right">Tổng tiền xe</p>
            <span className="text-lg text-orange-400">
              {detailBookingBus?.ThanhTien} VND
            </span>
          </div>
          <button
            onClick={handleCancel}
            className="bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2"
          >
            Hủy vé
          </button>

          <button onClick={handleChangeBooking} className="bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2">
            Đổi lịch
          </button>
          <button className="bg-orange-500 ml-4 w-fit text-white font-bold rounded-lg p-2">
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelTicketBus;
