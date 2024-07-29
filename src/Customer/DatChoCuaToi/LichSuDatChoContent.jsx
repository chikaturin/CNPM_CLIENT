import { useEffect, useState } from "react";
import listIcon from "../../assets/user-booking-ic.svg";
import axios from "axios";
import PickRangeTimeToFilter from './PickRangeTimeToFilter';
import ModalFilter from './ModalFilter';
const API_BASE_URL = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com";

function LichSuDatChoContent() {
  //   const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
  //   const [showLichSuOto,setShowLichSuOto] = useState([]);
  //   const [showLichSuDatTau,setShowLichSuDatTau] = useState([]);
  //   const [showLichSuXeBus,setShowLichSuXeBus] = useState([]);

  // useEffect(() => {
  //   const getLichSuOto = async () => {
  //       try {
  //           const res = await axios.get(`${url}/GetLichSuDatXeOto`);
  //           console.log(res.data);
  //           setShowLichSuOto(res.data.lichSuDatXeOto);
  //       } catch (error) {
  //           console.error(
  //           "Request failed with status code",
  //           error.response?.status
  //           );
  //       }
  //   }
  //   const getLichSuTau = async () => {
  //       try {
  //           const res = await axios.get(`${url}/GetLichSuDatTau`);
  //           console.log(res.data);
  //           setShowLichSuDatTau(res.data.lichSuDatTau);
  //       } catch (error) {
  //           console.error(
  //           "Request failed with status code",
  //           error.response?.status
  //           );
  //       }
  //   }
  //   const getLichSuBus = async () => {
  //       try {
  //           const res = await axios.get(`${url}/GetLichSuXeBus`);
  //           console.log(res.data);
  //           setShowLichSuXeBus(res.data.lichSuDatXeBus);
  //       } catch (error) {
  //           console.error(
  //           "Request failed with status code",
  //           error.response?.status
  //           );
  //       }
  //   }
  //   getLichSuOto();
  //   getLichSuTau();
  //   getLichSuBus();
  // }, []);

  // Mặc định hiển thị cả 3
  const [checkedItems, setCheckedItems] = useState({
    car: false,
    bus: false,
    train: false,
  });

const [allData, setAllData] = useState([]);
const [filteredData, setFilteredData] = useState([]);


const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({
      ...checkedItems, [name]: checked,
    });
};

// Lấy hết từ cả 3 route => Gộp chung
useEffect(() => {
    const fetchVehicle = async () => {
        try {
            // let results = [];
            const [carResponse, busResponse, trainResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/GetLichSuDatXeOto`),
                axios.get(`${API_BASE_URL}/api/GetHistoryBus`),
                axios.get(`${API_BASE_URL}/api/GetLichSuDatTau`),
              ]);
            
            // Logic filter

            //---------------------------------------------------
            const combinedData = [
                ...carResponse.data.lichSuDatXeOto,
                ...busResponse.data.lichSuDatXeBus,
                ...trainResponse.data.lichSuDatTau,
            ];
            console.log(combinedData);
            setAllData(combinedData);
            setFilteredData(combinedData);
            // if (checkedItems.car) {
            //     const carResponse = await axios.get(`${API_BASE_URL}/api/GetLichSuDatXeOto`);
            //     results = results.concat(carResponse.data);
            // }
            // if (checkedItems.bus) {
            //     const busResponse = await axios.get(`${API_BASE_URL}/api/GetHistoryBus`);
            //     results = results.concat(busResponse.data);
            // }
            // if (checkedItems.train) {
            //     const trainResponse = await axios.get(`${API_BASE_URL}/api/GetLichSuDatTau`);
            //     results = results.concat(trainResponse.data);
            // }
        } catch (error) {
            console.error(
                "Request failed with status code",
                error.response?.status
            );
        }
    };
    fetchVehicle();
}, []);

//Lọc từ modal checkbox
useEffect(() => {
    const filterVehicle = () => {
      let filtered = allData;

      if (checkedItems.car || checkedItems.bus || checkedItems.train) {
        filtered = allData.filter((item) => {
          if (checkedItems.car && item.type === 'car') return true;
          if (checkedItems.bus && item.type === 'bus') return true;
          if (checkedItems.train && item.type === 'train') return true;
          return false;
        });
      }
      setFilteredData(filtered);
    };
    filterVehicle();
  }, [checkedItems, allData]);

  
  return (
    <div className="w-[70%] mt-10 overflow-y-auto">

      {/* <div className="w-full shadow bg-[#EDEDED] rounded-lg">
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
      </div> */}

      <div className="w-full shadow bg-[#EDEDED] rounded-lg mb-6">
        <div className="inline-flex items-center p-4">
          <div className="mr-4">
            <img src={listIcon} alt="Avatar"
              className='w-[32px] h-[32px] rounded-full' />
          </div>
          <div className="font-semibold text-lg">
            Xem tất cả vé máy bay và phiếu thanh toán trong <a path="#" className='text-[#1D4886]'>Đặt chỗ của tôi</a>
          </div>
        </div>
      </div>

      <div className="inline-flex justify-end  w-full">
        <PickRangeTimeToFilter />
        <div className="w-[1px] bg-gray-300 mx-4"></div>
        <ModalFilter
          checkedItems={checkedItems}
          handleChange={handleChange}
        />
      </div>

      <div className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg">
        <div className="p-4">
          <div className="font-bold">TP HCM -&gt; HN</div>
          <hr className="my-4 border-t-2 border-slate-300 w-full" />
          <div className="inline-flex w-full">
            <div className="w-[70%]">
              <div className="">Ngày - giờ đặt: CN, 26 thg 3 2017 | 09:20</div>
              <div className="">VietJet Air | Sân bay quốc tế Tân Sơn Nhất, Nhà ga 1</div>
            </div>
            <div className="w-[30%] flex justify-center items-center">
              <div className="">
                559.500
              </div>
            </div>
          </div>
        </div>
      </div>
      {filteredData.map((vehicle, index) => (
        <div key={index._id} className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg">
          <div className="p-4">
            <div className="font-bold">Tuyến: </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="inline-flex w-full">
              <div className="w-[70%]">
                <div className="">{vehicle.MaDX}</div>
                <div className="">{vehicle.Date}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      &&
      {filteredData.map((vehicle, index) => (
        <div key={index._id} className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg">
          <div className="p-4">
            <div className="font-bold">Tuyến: </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="inline-flex w-full">
              <div className="w-[70%]">
                <div className="">{vehicle.MaVeBus}</div>
                <div className="">Xe bus</div>
              </div>

            </div>
          </div>
        </div>
      ))}
      &&
      {filteredData.map((vehicle, index) => (
        <div key={index._id} className="hover:border-[#00266B] hover:border-2 mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg">
          <div className="p-4">
            <div className="font-bold">Tuyến: </div>
            <hr className="my-4 border-t-2 border-slate-300 w-full" />
            <div className="inline-flex w-full">
              <div className="w-[70%]">
                <div className="">{vehicle.MaVeTau}</div>
                <div className="">Xe tàu</div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LichSuDatChoContent;
