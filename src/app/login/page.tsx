"use client";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import React, { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex-1 flex flex-col gap-20 items-center justify-center bg-white">
      <h1>Welcome Back</h1>
      <form className="flex flex-col flex-initial gap-5 min-w-[20rem]">
        <label className="flex-1 flex flex-col">
          <h3>Email Address</h3>
          <input
            type="text"
            placeholder="email@example.com"
            className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
          />
        </label>
        {/* <label className="flex-1 flex flex-col">
          <h3>Password</h3>
          <input
            type="password"
            placeholder="enter password"
            className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
          />
        </label> */}
        <label className="flex-1 flex flex-col">
      <h3>Password</h3>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="enter password"
          className="text-gray-600 bg-gray-50 border text-sm rounded-lg p-2"
        />
        <button 
          type="button" 
          onClick={togglePasswordVisibility} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </label>
        <Button
          component={Link}
          href="/profile"
          type="submit"
          className="mt-16"
        >
          Login
        </Button>
        <Button intent="secondary" component={Link} href="/">
          Forgot your password?
        </Button>
      </form>
    </div>
  );
}
