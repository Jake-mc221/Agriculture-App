import { BiHomeSmile } from "react-icons/bi";
import { FiCompass } from "react-icons/fi";
import {FaRankingStar} from "react-icons/fa6";
import {BsPerson} from "react-icons/bs";
import {LuScanLine} from "react-icons/lu";
import { IconContext } from "react-icons";

export default function Navbar() {
    const style = {color:"white"}
    return (
      
    <nav className="flex flex-col w-full grow-[1] self-end h-5 bg-slate-50">
        <button className="self-center h-12 w-12 overflow-visible bg-green-500 rounded-full shadow-2xl hover:shadow-xl shadow-green-500 absolute bottom-16 m-0 bg-gradient-to-t from-green-600 to-green-400">
            <a className="m-0">
                <LuScanLine style={style} size={25} className="items-center w-full "/>
            </a>
        </button>

        <div className="flex flex-row justify-around h-full border-t-1 border-slate-10 padding-0">
            <button className="self-start bg-transparent h-full">
                <a>
                <BiHomeSmile size={30} className="opacity-20"/>
                </a>
            </button>
            
            <button className="bg-transparent h-full">
                <a>
                <FiCompass size={30} className="opacity-20"/>
                </a>
            </button>
            
            <button className="bg-transparent h-full">
                <a>
                <FaRankingStar size={30} className="opacity-20"/>
                </a>
            </button>

            <button className="userNav">
                <a>
                <BsPerson size={30} className="opacity-20"/>
                </a>
            </button>
        </div>
    </nav>  
      
    );
}