// import { useEffect, useState } from "react";
// import axios from "axios";
import Ads from "./ads";
// import listIcon from '../../assets/user-booking-ic.svg'

// const API_BASE_URL = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com";
function RightContent() {

//   const [dataVehicle, setDataCar] = useState([]);
//   //Xử lý data xe
//   useEffect(() => {
//     const getListCar = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/GetDetailCar`);
//         console.log(res.data);
//         setDataCar(res.data.chiTietXeOto);
//       } catch (error) {
//         console.error(
//           "Request failed with status code",
//           error.response?.status
//         );
//       }
//     };
//     getListCar();
//   }, []);

    return ( 
        <div className="w-[70%] mt-10">
            <Ads/>
            <div className="w-full shadow bg-[#EDEDED] rounded-lg">
                
                {/* <div className="inline-flex items-center p-4 mt-5">
                    <div className="mr-4">
                    <img src={listIcon} alt="Avatar"
                                    className='w-[32px] h-[32px] rounded-full' />
                    </div>
                    <div className="font-semibold text-lg"> 
                        Xem tất cả vé máy bay và phiếu thanh toán trong <a path="#" className='text-[#1D4886]'>Đặt chỗ của tôi</a>
                    </div>
                </div> */}
            </div>
            <h1 className="text-black my-5 font-bold text-2xl">Vé điện tử & Phiếu thanh toán hiện hành</h1>
            <div className="mt-5 w-full shadow bg-[#EDEDED] rounded-lg mb-6 text-lg">
                <div className="p-4">
                    <div className="font-bold mb-2">TP HCM -&gt; HN</div>
                    
                    <div className="inline-flex w-full">
                        <div className="w-[70%]">
                            <div className="">CN, 26 thg 3 2017 | 09:20</div>
                            <div className="">VietJet Air | Sân bay quốc tế Tân Sơn Nhất, Nhà ga 1</div>
                        </div>
                        <div className="w-[30%] flex justify-center items-center">
                            <div className="">
                                559.500
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 border-t-2 border-slate-300 w-full" />
                    <div className="w-full inline-flex justify-between">
                    <a>
                        <div className="font-bold text-blue-900">XEM VÉ ĐIỆN TỬ</div>
                    </a>
                    <a>
                        <div className="font-bold text-blue-900">QUẢN LÝ ĐẶT CHỖ</div>
                    </a>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default RightContent;