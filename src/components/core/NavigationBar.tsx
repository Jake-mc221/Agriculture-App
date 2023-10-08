"use client";

import { FaSearch } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { BsFillCameraFill } from "react-icons/bs";
import { MdAddChart } from "react-icons/md";
import Link from "next/link";
import { Button } from "../common/Button";
import { useContext, useCallback } from "react";
import { PhotoContext } from "@/app/context";
import { useRouter } from "next/navigation";
import {capture} from '@/logic/localStorage';
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const path = usePathname();
  const router = useRouter();


  return (
    <>
      <div className="h-18 w-full">
        <nav className="fixed left-0 bottom-0 flex flex-col w-full h-20 bg-white">
          <div className="flex-1 flex flex-row justify-around items-center border border-t border-slate-10">
            <Button
              className="w-full h-full rounded-md flex"
              intent="unstyled"
              component={Link}
              href="/search"
            >
              <FaSearch
                className={
                  "text-2xl text-gray-600 m-auto " +
                  (path === "/search" ? "text-green-500" : "")
                }
              />
            </Button>
            <Button
              className="w-full h-full rounded-md flex "
              intent="unstyled"
              component={Link}
              href="/label"
            >
              <MdAddChart
                className={
                  "text-3xl text-gray-600 m-auto " +
                  (path === "/label" ? "text-green-500" : "")
                }
              />
            </Button>
            <Button
              intent="unstyled"
              onClick={async () => {
                await capture();
                router.push("/capture/bound");
              }}
              className="m-auto w-full h-full flex rounded-md "
            >
              <BsFillCameraFill
                className={
                  "m-auto justify-center self-center text-5xl text-green-700 " +
                  (path == "/capture" ? "from-primary to-green-500" : "")
                }
              />
            </Button>
            <Button
              className="w-full h-full rounded-md flex"
              intent="unstyled"
              component={Link}
              href="/leaderboard"
            >
              <FaRankingStar
                className={
                  "text-3xl text-gray-600 m-auto " +
                  (path === "/leaderboard" ? "text-green-500" : "")
                }
              />
            </Button>
            <Button
              className="w-full h-full rounded-md flex"
              intent="unstyled"
              component={Link}
              href="/profile"
            >
              <BsPerson
                className={
                  "text-3xl text-gray-600 m-auto " +
                  (path === "/profile" ? "text-green-500" : "")
                }
              />
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
