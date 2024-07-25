import * as React from "react";
import { useState } from "react";
import ButtonComp from "./button";
import { Button } from "baseui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="fixed">
      <div className="flex w-screen items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Fee Wizard
          </span>
        </div>
        {!isOpen && (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow text-black">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-400 mr-4"
            >
              Plans
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-400 mr-4"
            >
              About Us
            </a>
          </div>
        </div>
        )}
        {isOpen && (
            <>
        <div className="block lg:hidden" onClick={()=> setIsOpen(false) }>
          <button className="flex items-center px-3 py-2 border rounded text-black">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
              ></path>
            </svg>
          </button>
        </div>
 
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow text-black">
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-400 mr-4"
            >
              Plans
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-400 mr-4"
            >
              About Us
            </a>
          </div>
        </div>
        </>
        )}
        <div className="mt-3">
      <Button
        onClick={() => {}}
        size="compact"
        >
        Logout
        </Button>
        </div>
      </div>
    </div>
  );
}
