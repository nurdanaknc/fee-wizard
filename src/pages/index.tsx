import Image from "next/image";
import { Inter } from "next/font/google";
import { Spinner } from "baseui/spinner";
import { use, useEffect } from "react";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });



export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }
    , [router]);

  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );

}
