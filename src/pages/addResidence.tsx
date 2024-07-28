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
import { useAppDispatch } from "@/app/store/hooks";
import { addSite } from "@/app/store/sites";
import { toaster } from "baseui/toast";

export default function SelectResidence() {
  const [selectedLocation, setSelectedLocation] = React.useState([] as any);
  const [resName, setResName] = React.useState("");
  const [selectedManagers, setSelectedManagers] = React.useState<Value>([]);
  const dispatch = useAppDispatch();
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
                setValue={setResName}
                placeholder="Enter residence name.."
              />
              <span className=" text-black text-sm font-medium">Location</span>
              <Select
                options={locations}
                value={selectedLocation}
                placeholder="Select location.."
                onChange={(e: any) => setSelectedLocation(e.value)}
              ></Select>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <ButtonComp
                type="addResidence"
                size="default"
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user")!) as { user_id : string };
                  dispatch(addSite({ name: resName, location: selectedLocation[0]?.label, managers: [user?.user_id] })).then(() => {
                    toaster.positive("Residence added successfully", {});
                    router.push("/selectResidence");
                  }
                  );
                }}
                label="Add Residence"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
