import * as React from "react";
import { useState } from "react";
import ButtonComp from "./button";
import { Button } from "baseui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="">
      <div className="flex w-screen items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Fee Wizard
          </span>
        </div>
        {(
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow text-black">
            <a
              href="/plans"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-400 mr-4"
            >
              Plans
            </a>
            <a
              href="/calculation-methods"
              className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-400 mr-4"
            >
              Calculation Methods
            </a>
         
          </div>
        </div>
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
