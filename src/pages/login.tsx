import React from "react";
import { useEffect, useState } from "react";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import InputField from "@/app/components/inputField";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Regex from "@/helpers/regex";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { data: session } = useSession(); // session a erişildi ve data değişkenine atandı
  const router = useRouter();

  const loginSubmit = async () => {
    // router.push("/users");
    /*
    const req = dispatch(login({username: username, password: password}));
    const res = await req;
    localStorage.setItem("accessToken", res.payload?.data || "");
    console.log("response is this \t",res);
    */

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    console.log(res, "res");
    if (res?.status == 200) {
      clearErrors();
      router.push("/selectResidence");
    } else if (password?.length <= 6 && !password) {
      setPasswordError(true);
    }
    else if (Regex("emailRegex", email) && !email) {
      setEmailError(true);
    }
    else if (res?.status != 200) {
      setEmailError(true);
      setPasswordError(true);
    }
  };

  const clearErrors = () => {
    setEmailError(false);
    setPasswordError(false);
  };


  useEffect(() => {
    console.log(email, "email");
    console.log(password, "password");
  }
  , [password, email]);

/*
  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        await loginSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  */

  useEffect(() => {
    //@ts-ignore
    localStorage.setItem("accessToken", session?.accessToken || ""); //session local storage a kaydedildi, bunun yerine storeda da tutulabilir.
    localStorage.setItem("user", JSON.stringify(session?.user || "")); //session local storage a kaydedildi, bunun yerine storeda da tutulabilir.
  }, [session]);

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
                setValue={setEmail}
                placeholder="Enter your email.."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Password</span>
              <InputField
                value={password}
                setValue={setPassword}
                placeholder="Enter your password.."
                type="password"
              />
            </div>
            <div className=" w-full">
              <Button className="w-full" onClick={() => loginSubmit()}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
