"use client";

import { FaSearch } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { LuScanLine } from "react-icons/lu";
import { MdAddChart } from "react-icons/md";
import Link from "next/link";
import { Button } from "../common/Button";
import { SetStateAction, useState } from "react";
import { useContext } from "react";
import { PhotoContext } from "@/app/context";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const [activeLink, setActiveLink] = useState("home"); // current active link is home
  const changeActive = (link: SetStateAction<string>) => {
    setActiveLink(link);
  };

  const { takePhoto } = useContext(PhotoContext);
  const path = usePathname();

  return (
    <>
      <div className="h-18 w-full">
        <nav className="fixed left-0 bottom-0 flex flex-col w-full h-20 bg-slate-50">
          <Button
            intent="unstyled"
            component={Link}
            onClick={async () => 
              {await takePhoto();
              redirect("/capture");
            }}
            href="/capture"
            className={
              "self-center z-10 flex justify-center items-center h-20 w-20 rounded-full shadow-md absolute bottom-24 bg-gradient-to-t from-primary to-green-300" +
              (path == "/capture" ? "from-primary to-green-500" : "")
            }
          >
            <LuScanLine className="text-4xl text-gray-600" />
          </Button>

          <div className="flex-1 flex flex-row justify-around items-center border border-t border-slate-10">
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (path === "/search" ? "bg-slate-200" : "")
              }
              intent="unstyled"
              component={Link}
              href="/search"
            >
              <FaSearch className="text-3xl text-gray-600 m-auto" />
            </Button>
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (path === "/label" ? "bg-slate-200" : "")
              }
              intent="unstyled"
              component={Link}
              href="/label"
            >
              <MdAddChart className="text-3xl text-gray-600 m-auto" />
            </Button>
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (path === "/leaderboard" ? "bg-slate-200" : "")
              }
              intent="unstyled"
              component={Link}
              href="/leaderboard"
            >
              <FaRankingStar className="text-3xl text-gray-600 m-auto" />
            </Button>
            <Button
              className={
                "w-full h-full rounded-md flex " +
                (path === "/profile" ? "bg-slate-200" : "")
              }
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
