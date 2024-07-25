import InputField from "@/app/components/inputField";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import { Select } from "baseui/select";
import React from "react";

import Icon from "@mdi/react";
import { mdiHomePlus } from "@mdi/js";
import ButtonComp from "@/app/components/button";
import { useRouter } from "next/router";

export default function SelectResidence() {
  const [selectedResidence, setSelectedResidence] = React.useState([]);
  const router = useRouter();
  const residences = [
    { id: 1, label: "Residence 1" },
    { id: 2, label: "Residence 2" },
    { id: 3, label: "Residence 3" },
    { id: 4, label: "Residence 4" },
    { id: 5, label: "Residence 5" },
  ];
  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <div className=" px-20 py-12 flex flex-col gap-4 items-center justify-center w-[600px]">
          <div className="flex flex-col gap-2 items-center text-center">
            <img src="img/residenceIcon.png" alt="selectResidence" className="w-10 h-10" />
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
                options={residences}
                value={selectedResidence}
                placeholder="Select residence.."
                onChange={(e: any) => setSelectedResidence(e.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button className="w-full" onClick={() => router.push("/plans")}>
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
