import React from "react";
import { useEffect, useState } from "react";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import InputField from "@/app/components/inputField";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <div className=" px-20 py-14 flex flex-col gap-4 items-center justify-center w-[500px]">
          <div className="flex flex-col gap-2 text-center">
            <div className=" text-2xl font-bold text-black ">
              Login To Your Account
            </div>
            <div className=" text-base font-light text-gray-500">
              Enter your credentials to acces your account.
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Email</span>
              <InputField
                value={email}
                setValue={(e: any) => setEmail(e.value)}
                placeholder="Enter your email.."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Password</span>
              <InputField
                value={password}
                setValue={(e: any) => setPassword(e.value)}
                placeholder="Enter your password.."
                type="password"
              />
            </div>
            <div className=" w-full">
              <Button className="w-full" onClick={() => {router.push("/selectResidence")}}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
