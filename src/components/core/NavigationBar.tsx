import { BiHomeSmile } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { MdAddChart } from "react-icons/md";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <>
      <div className="h-36 w-full">
        <nav className="fixed left-0 bottom-0 flex flex-col w-full h-36 bg-slate-50">
          <Link
            href="/capture"
            className="self-center flex justify-center items-center h-20 w-20 rounded-full shadow-md absolute bottom-24 bg-gradient-to-t from-primary to-green-400"
          >
            <LuScanLine className="text-3xl text-gray-600" />
          </Link>

          <div className="flex-1 flex flex-row justify-around items-center border border-t border-slate-10">
            <Link href="/">
              <BiHomeSmile className="text-3xl text-gray-600" />
            </Link>
            <Link href="/label">
              <MdAddChart className="text-3xl text-gray-600" />
            </Link>
            <Link href="/leaderboard">
              <FaRankingStar className="text-3xl text-gray-600" />
            </Link>
            <Link href="/profile">
              <BsPerson className="text-3xl text-gray-600" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
