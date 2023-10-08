import React from "react";
import { Button } from "./Button";
import Link from "next/link";
import { BsArrowRepeat } from "react-icons/bs";
import { PhotoContext } from "@/app/context";
import { useContext, useCallback } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useStorage } from "@/logic/localStorage";

export function TopBar() {
  const { retake } = useStorage();
  const router = useRouter();

  return (
    <div className="top-0 w-full h-10 flex bg-black justify-between z-50 ">
      {/*Back button */}
      <Button
        className="text-green-400 m-2"
        intent="unstyled"
        onClick={router.back}
      >
        Back
      </Button>

      <div className="flex gap-3">
        {/*Link to guidelines page */}
        <Button
          className="text-white flex justify-end opacity-80"
          intent="unstyled"
          component={Link}
          href="/guidelines"
        >
          <HiOutlineInformationCircle className="m-auto self-center text-2xl justify-center" />
        </Button>
        {/*Retake photo button*/}
        <Button
          className="text-white flex justify-end opacity-80"
          intent="unstyled"
          onClick={async () => {
            await retake();
            router.push("/capture/bound");
          }}
        >
          <BsArrowRepeat className="m-auto self-center text-2xl justify-center mr-2" />
        </Button>
      </div>
    </div>
  );
}
