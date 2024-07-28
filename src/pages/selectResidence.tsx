import InputField from "@/app/components/inputField";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import { Select } from "baseui/select";
import React, { useEffect } from "react";

import Icon from "@mdi/react";
import { mdiHomePlus } from "@mdi/js";
import ButtonComp from "@/app/components/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getSitesByManagerId } from "@/app/store/sites";
import Toaster from "@/app/components/toaster";
import { toaster } from "baseui/toast";

export default function SelectResidence() {
  const [selectedResidence, setSelectedResidence] = React.useState([] as any);
  const [allResidences , setAllResidences] = React.useState([] as any);
  const router = useRouter();
  const dispatch = useAppDispatch();


  const residences = [
    { id: 1, label: "Residence 1" },
    { id: 2, label: "Residence 2" },
    { id: 3, label: "Residence 3" },
    { id: 4, label: "Residence 4" },
    { id: 5, label: "Residence 5" },
  ];
  
  const getSites = async () => {
    const user = JSON.parse(localStorage.getItem("user")!) as { user_id : string }; // Update the type of 'user' variable
    const res = await dispatch(getSitesByManagerId(user?.user_id)); // Access the '_id' property directly
    if (res && user?.user_id) {
   console.log(res, "res");
   if (res?.payload?.data.length >= 0) {
      setAllResidences(
        res?.payload?.data.map((item: any) => {
          return {
            id: item?._id,
            label: item?.name,
          };
        })
      );}
    }
  }

  useEffect(() => {
    getSites();
    
  }
  , []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <div className=" px-20 py-12 flex flex-col gap-4 items-center justify-center w-[600px]">
          <div className="flex flex-col gap-2 items-center text-center">
            <Image
              src="/img/residenceIcon.png"
              alt="selectResidence"
              width={40}
              height={40}
            />
            <div className=" text-2xl font-bold text-black ">
              Select Residence
            </div>
            <div className=" text-base font-light text-gray-500">
              Select residence that you want to manage.
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">
                Select Residence
              </span>
              <Select
                options={allResidences}
                value={selectedResidence}
                placeholder="Select residence.."
                onChange={(e: any) => setSelectedResidence(e.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button className="w-full" onClick={() => {
                if(selectedResidence.length === 0) {
                  toaster.negative("Please select a residence", {});
                  return;
                }
                else{
                  router.push("/plans");
                  localStorage.setItem("siteId", selectedResidence[0]?.id);
                }
              }}>
                Continue
              </Button>
              <ButtonComp
                type="addResidence"
                size="small"
                outlined={true}
                onClick={() => router.push("/addResidence")}
                label="Add Residence"
                />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
