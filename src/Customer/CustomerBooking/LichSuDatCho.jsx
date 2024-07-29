import LeftNavBar from "./LeftNavBar";
import LichSuDatChoContent from "./LichSuDatChoContent";
function LichSuDatCho() {
    return ( 
        <div className=" flex w-full justify-center ">
            <div className="flex w-[1222px] justify-between">
                <LeftNavBar />
                <LichSuDatChoContent />
            </div>
        </div> 
     );
}

export default LichSuDatCho;