import InputField from "@/app/components/inputField";
import { Button } from "baseui/button";
import { Card } from "baseui/card";
import { Select, Value } from "baseui/select";
import React, { use } from "react";

import Icon from "@mdi/react";
import { mdiHomePlus, mdiChevronLeft } from "@mdi/js";
import ButtonComp from "@/app/components/button";
import { useRouter } from "next/router";
import Image from "next/image";

export default function SelectResidence() {
  const [selectedLocation, setSelectedLocation] = React.useState([]);
  const [resName, setResName] = React.useState("");
  const [selectedManagers, setSelectedManagers] = React.useState<Value>([]);
  const router = useRouter();
  const locations = [
    { id: 1, label: "Local 1" },
    { id: 2, label: "Local 2" },
    { id: 3, label: "Local 3" },
    { id: 4, label: "Local 4" },
    { id: 5, label: "Local 5" },
  ];

  const managers = [
    { id: 1, label: "Manager 1" },
    { id: 2, label: "Manager 2" },
    { id: 3, label: "Manager 3" },
    { id: 4, label: "Manager 4" },
    { id: 5, label: "Manager 5" },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <div className=" cursor-pointer" onClick={router.back}>
          <Icon path={mdiChevronLeft} size={1} color="black" />
        </div>
        <div className=" px-20 py-12 flex flex-col gap-4 items-center justify-center w-[600px]">
          <div className="flex flex-col gap-2 items-center text-center">
            <Image
              src="/img/residenceIcon.png"
              alt="selectResidence"
              width={40}
              height={40}
            />
            <div className=" text-2xl font-bold text-black ">Add Residence</div>
            <div className=" text-base font-light text-gray-500">
              Add new Residence to manage
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">
                Residence Name
              </span>
              <InputField
                value={resName}
                setValue={(e: any) => setResName(e.value)}
                placeholder="Enter residence name.."
              />
              <span className=" text-black text-sm font-medium">Location</span>
              <Select
                options={locations}
                value={selectedLocation}
                placeholder="Select location.."
                onChange={(e: any) => setSelectedLocation(e.value)}
              ></Select>
              <span className=" text-black text-sm font-medium">Managers</span>
              <Select
                creatable
                multi
                options={managers}
                placeholder="Select managers.."
                labelKey="label"
                valueKey="id"
                onChange={({ value }) => setSelectedManagers(value)}
                value={selectedManagers}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <ButtonComp
                type="addResidence"
                size="default"
                onClick={() => alert("click")}
                label="Add Residence"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
