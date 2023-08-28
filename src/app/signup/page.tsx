"use client";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useId } from "react";
import React, { useState } from 'react';

function TextInput({ type, content }: { type: string; content: string }) {
  return (
    <input
      type={type}
      placeholder={content}
      className="bg-gray-100 p-3 rounded ring-1 ring-gray-200"
    ></input>
  );
}

export default function SignUp() {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="flex-1 flex flex-col gap-20 items-center justify-center bg-white">
      <Link href="/login" legacyBehavior>
        <a className="absolute top-2 right-2 text-black hover:text-gray-700">Login</a>
      </Link>
      <Link href="/" legacyBehavior>
        <a className="absolute top-2 left-2 text-black hover:text-gray-700"><span>&#x1F1FD;</span></a>
      </Link>
      <div className="text-4xl pt-5">Sign Up</div>
      
      <form className="flex flex-col flex-initial gap-5 min-w-[20rem]">
        <TextInput type="text" content="Name"></TextInput>
        <TextInput type="text" content="Email"></TextInput>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="enter password"
            className="bg-gray-100 p-3 rounded ring-1 ring-gray-200 min-w-[20rem]"
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >{showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            value=""
            id="checkboxChecked"
            defaultChecked
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="checkboxChecked">
            I agree to the terms & conditions
          </label>
        </div>
        <Button
          component={Link}
          href="/profile"
          type="submit"
          className="mt-16"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
