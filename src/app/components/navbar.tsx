import * as React from "react";
import { useState } from "react";
import ButtonComp from "./button";
import { Button } from "baseui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="fixed">
      <div className="flex w-screen items-center justify-between flex-wrap bg-white px-6 py-3">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Fee Wizard
          </span>
        </div>

        <div className="w-auto flex items-center ">
          <div className="text-sm flex-grow text-black">
            <Link
              href="/plans"
              className="inline-block mt-0  hover:text-gray-400 mr-4"
            >
              Plans
            </Link>
            <Link
              href="/calculation-methods"
              className=" inline-block mt-0  hover:text-gray-400 mr-4"
            >
              Calculation Methods
            </Link>
         
          </div>
        </div>

  
        <div className="mt-3">
      <Button
        onClick={() => {
          signOut();
        }}
        size="compact"
        >
        Logout
        </Button>
        </div>
      </div>
    </div>
  );
}
