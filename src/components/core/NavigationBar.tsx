"use client";

import { FaSearch } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { MdAddChart } from "react-icons/md";
import Link from "next/link";
import { Button } from "../common/Button";
import { SetStateAction, useState } from "react";

export default function NavigationBar() {
  const [activeLink, setActiveLink] = useState("home"); // current active link is home
  const changeActive = (link: SetStateAction<string>) => {
    setActiveLink(link);
  };
  return (
    <>
      <div className="h-36 w-full">
        <nav className="fixed left-0 bottom-0 flex flex-col w-full h-36 bg-slate-50">
          <Button
            intent="unstyled"
            component={Link}
            href="/capture"
            className=" self-center z-10 flex justify-center items-center h-20 w-20 rounded-full shadow-md absolute bottom-24 bg-gradient-to-t from-primary to-green-400"
          >
            <LuScanLine className="text-3xl text-gray-600" />
          </Button>

          <div className="flex-1 flex flex-row justify-around items-center border border-t border-slate-10">
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (activeLink === "home" ? "bg-slate-200" : "")
              }
              onClick={() => changeActive("home")}
              intent="unstyled"
              component={Link}
              href="/search"
            >
              <FaSearch className="text-3xl text-gray-600 m-auto" />
            </Button>
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (activeLink === "add" ? "bg-slate-200" : "")
              }
              onClick={() => changeActive("add")}
              intent="unstyled"
              component={Link}
              href="/label"
            >
              <MdAddChart className="text-3xl text-gray-600 m-auto" />
            </Button>
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (activeLink === "leaderboard" ? "bg-slate-200" : "")
              }
              onClick={() => changeActive("leaderboard")}
              intent="unstyled"
              component={Link}
              href="/leaderboard"
            >
              <FaRankingStar className="text-3xl text-gray-600 m-auto" />
            </Button>
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (activeLink === "profile" ? "bg-slate-200" : "")
              }
              onClick={() => changeActive("profile")}
              intent="unstyled"
              component={Link}
              href="/profile"
            >
              <BsPerson className="text-3xl text-gray-600 m-auto" />
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
