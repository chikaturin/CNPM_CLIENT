import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import UseFetch from "../../Router/UseFetch";
import { useNavigate } from "react-router-dom";

const DanhSachSanBay = () => {
  const navigate = useNavigate();
  const { data: sanbay, error } = UseFetch(
    "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDanhSachSanBay"
  );

  const handleDeleteSanBay = async (_id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/DeleteDanhSachSanBay/${_id}`,
        {
          method: "DELETE",
        }
      );
      const { status } = await res.json();
      if (res.status == 200) {
        alert("Xóa thành công");
        window.location.reload();
      } else {
        alert("Xóa thất bại");
      }
    } catch (error) {
      console.error("Error deleting san bay:", error);
      alert("Đã xảy ra lỗi khi xóa sân bay");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-auto h-full bg-white">
      <div className="flex w-auto">
        <h1 className="text-black w-1/2 p-4 text-4xl">Danh sách sân bay</h1>
        <div className="flex w-1/2 mr-2 justify-end">
          <button className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded">
            <a className="no-underline text-white" href="/CreateDanhSachSanBay">
              Thêm sân bay
            </a>
          </button>
        </div>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-4 py-2">Mã sân bay</th>
              <th className="border px-4 py-2">Tên sân bay</th>
              <th className="border px-4 py-2">Thành phố</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sanbay.map((sanBay) => (
              <tr key={sanBay._id} className="text-black">
                <td className="border px-4 py-2">{sanBay.MaSB}</td>
                <td className="border px-4 py-2">{sanBay.TenSanBay}</td>
                <td className="border px-4 py-2">{sanBay.ThanhPho}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <button className="bg-blue-500 px-4 mr-2 py-2 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="bg-red-500 px-4 py-2 w-fit h-fit hover:bg-red-700 text-white font-bold rounded"
                    onClick={() => handleDeleteSanBay(sanBay._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DanhSachSanBay;
