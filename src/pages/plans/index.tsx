import ButtonComp from "@/app/components/button";
import Navbar from "@/app/components/navbar";
import { activateNavbar } from "@/app/store/api";
import { Card } from "baseui/card";
import { title } from "process";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import InputField from "@/app/components/inputField";
import { Router, useRouter } from "next/router";

export default function ResidenceDetails() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [planName, setPlanName] = React.useState("");
  const data = [
    {
      year: 2024,
      name: "Plan 1",
    },
    {
      year: 2025,
      name: "Plan 2",
    },
    {
      year: 2026,
      name: "Plan 3",
    },
    {
      year: 2027,
      name: "Plan 4",
    },
  ];
  useEffect(() => {
    dispatch(activateNavbar());
  }, [dispatch]);
  type TurkishCharacters = {
    ç: string;
    ğ: string;
    ı: string;
    ö: string;
    ş: string;
    ü: string;
  };

  const replaceTurkishCharacters = (str: string) => {
    const turkishMap: TurkishCharacters = {
      ç: "c",
      ğ: "g",
      ı: "i",
      ö: "o",
      ş: "s",
      ü: "u",
    };

    return str.replace(
      /[çğıöşü]/g,
      (match) => turkishMap[match as keyof TurkishCharacters]
    );
  };
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <Card>
          <div className="w-[800px]  p-4  sm:p-8 ">
            <div className="flex flex-row items-center justify-between gap-2 mb-4">
              <div>
                <h5 className="text-xl font-bold leading-none text-gray-900 ">
                  Plans
                </h5>
              </div>
              <ButtonComp
                onClick={() => {
                  setIsOpen(true);
                }}
                label="Add Plan"
                size="small"
                type="addResidence"
              />
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {data.map((item, index:number) => (
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0 ">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                          Name
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                          Year
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                          {item.year}
                        </p>
                      </div>
                      <div className="inline-flex items-center min-w-0 ms-4">
                        <ButtonComp
                          onClick={() => {
                            const slug = replaceTurkishCharacters(
                              item.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace("?", "")
                            );
                            const sanitizedSlug = slug.replace(
                              /[^a-zA-Z0-9-]/g,
                              ""
                            );
                            router.push(`plans/${sanitizedSlug}`);
                          }}
                          label="View Plan"
                          size="small"
                          outlined
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        <Modal
          onClose={() => setIsOpen(false)}
          closeable
          isOpen={isOpen}
          animate
          autoFocus
          size={SIZE.default}
          role={ROLE.dialog}
        >
          <ModalHeader>New Plan</ModalHeader>
          <div className="px-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Plan Name</span>
              <InputField
                value={planName}
                setValue={(e: any) => {
                  setPlanName(e.value);
                }}
                placeholder="Enter Plan Name.."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Plan Year</span>
              <InputField
                value={planName}
                setValue={(e: any) => {
                  setPlanName(e.value);
                }}
                type="number"
                placeholder="Enter Plan Name.."
              />
            </div>
          </div>
          <ModalFooter>
            <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
            <ModalButton>Add</ModalButton>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
