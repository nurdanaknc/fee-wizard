import ButtonComp from "@/app/components/button";
import Navbar from "@/app/components/navbar";
import { activateNavbar } from "@/app/store/api";
import { Card } from "baseui/card";
import { title } from "process";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Radio, RadioGroup } from "baseui/radio";
import { Input } from "baseui/input";
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
import { addCalculationMethod, addPlan, getCalculationMethodsBySiteId, getExpensesByPlanId, getPlansBySiteId, updateCalculationMethod } from "@/app/store/sites";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { BaseInput } from "baseui/input";

export default function ResidenceDetails() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  const [methodName, setMethodName] = React.useState("");
  const [methodType, setMethodType] = React.useState("");
  const [methodRates, setMethodRates] = React.useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

  const [selectedMethodId, setSelectedMethodId] = React.useState({} as any);

  const [calculationMethods, setCalculationMethods] = React.useState([] as any);

  useEffect(() => {
    dispatch(activateNavbar());
  }, [dispatch]);

  const router = useRouter();

  useEffect(() => {
    const siteId = localStorage.getItem("siteId") || "";
    console.log(siteId, "siteId");
    dispatch(getCalculationMethodsBySiteId(siteId)).then((res) => {
      setCalculationMethods(res.payload?.data);
    });
  }
    , []);

  return (
    <>
      <Navbar />
      <div className="flex mt-4 justify-center h-screen">

        <Card>
          <div className=" cursor-pointer" onClick={router.back}>
            <Icon path={mdiChevronLeft} size={1} color="black" />
          </div>
          <div className="w-[800px]  p-4  sm:p-8 ">
            <div className="flex flex-row items-center justify-between gap-2 mb-4">
              <div>
                <h5 className="text-xl font-bold leading-none text-gray-900 ">
                  Calculation Methods
                </h5>
              </div>
              <ButtonComp
                onClick={() => {
                  setMethodName("");
                  setMethodType("");
                  setMethodRates([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
                  setIsOpen(true);
                }}
                label="Add Calculation Method"
                size="small"
                type="addResidence"
              />
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {calculationMethods && calculationMethods?.length >= 0 ? calculationMethods?.map((item: any, index: number) => (
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
                          Type
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                          {item.type}
                        </p>
                      </div>

                      <div className="inline-flex items-center min-w-0 ms-4">
                        <ButtonComp
                          onClick={() => {
                            setIsEditOpen(true);
                            setSelectedMethodId(item._id);
                            setMethodName(item.name);
                            setMethodType(item.type);
                            setMethodRates(item.monthlyRates);
                          }}
                          label="View Method"
                          size="small"
                          outlined
                        />
                      </div>
                    </div>
                  </li>
                )) : (<li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ">
                      <p className="text-sm font-medium text-gray-900 truncate ">
                        Calculation Method not found! You can add a new calculation method.
                      </p>
                    </div>
                  </div>
                </li>)}
              </ul>
            </div>
          </div>
        </Card>
        {/*  Add Calculation Method Modal */}
        <Modal
          onClose={() => setIsOpen(false)}
          closeable
          isOpen={isOpen}
          animate
          autoFocus
          size={SIZE.auto}
          role={ROLE.dialog}
        >
          <ModalHeader>New Method</ModalHeader>
          <div className="px-6 flex flex-col gap-4 w-[700px]">
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Name</span>
              <InputField
                value={methodName}
                setValue={setMethodName}
                placeholder="Enter Plan Name.."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Type</span>
              <RadioGroup
                align="horizontal"
                name="horizontal"
                onChange={(e) => setMethodType(e.target.value)}
                value={methodType}
              >
                <Radio value="predicted">Unit-price Based -predicted</Radio>
                <Radio value="periodic">Usage Based -periodic</Radio>
              </RadioGroup>
            </div>
            <div className='grid grid-cols-2 w-full gap-2'>

              {methodRates?.map((item: any, index: number) => (
                <div key={index} className='mt-3 w-full'>
                  <span className=" text-black text-sm font-medium">Month {index + 1}</span>
                  <Input
                    value={item}
                    onChange={(e) => {
                     
                        const newRates = [...methodRates];
                        newRates[index] = Number(e.currentTarget.value);
                        setMethodRates(newRates);
                      
                    }}
                    placeholder="Enter Rate .."
                  />
                </div>
              ))}              </div>

          </div>
          <ModalFooter>
            <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
            <ModalButton
              onClick={() => {
                const siteId = localStorage.getItem("siteId") || "";
                dispatch(addCalculationMethod({
                  site_id: siteId,
                  name: methodName,
                  type: methodType,
                  monthlyRates: methodRates.map((item: number) => item / methodRates[0])
                }))
                setIsOpen(false);
                router.reload();
              }
              }
            >Add</ModalButton>
          </ModalFooter>
        </Modal>
        {/*  Edit Calculation Method Modal */}
        <Modal
          onClose={() => setIsEditOpen(false)}
          closeable
          isOpen={isEditOpen}
          animate
          autoFocus
          size={SIZE.auto}
          role={ROLE.dialog}
        >
          <ModalHeader>Edit Method</ModalHeader>
          <div className="px-6 flex flex-col gap-4 w-[700px]">
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Name</span>
              <InputField
                value={methodName}
                setValue={setMethodName}
                placeholder="Enter Plan Name.."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className=" text-black text-sm font-medium">Type</span>
              <RadioGroup
                align="horizontal"
                name="horizontal"
                onChange={(e) => setMethodType(e.target.value)}
                value={methodType}
              >
                <Radio value="predicted">Unit-price Based -predicted</Radio>
                <Radio value="periodic">Usage Based -periodic</Radio>
              </RadioGroup>
            </div>
            <div className='grid grid-cols-2 w-full gap-2'>

              {methodRates?.map((item: any, index: number) => (
                <div key={index} className='mt-3 w-full'>
                  <span className=" text-black text-sm font-medium">Month {index + 1}</span>
                  <Input
                    value={item}
                    onChange={(e) => {
                        const newRates = [...methodRates];
                        newRates[index] = Number(e.currentTarget.value);
                        setMethodRates(newRates);
x                    }}
                    placeholder="Enter Rate .."
                  />
                </div>
              ))}              </div>

          </div>
          <ModalFooter>
            <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
            <ModalButton
              onClick={() => {
                const siteId = localStorage.getItem("siteId") || "";
                dispatch(updateCalculationMethod({
                  method_id: selectedMethodId,
                  site_id: siteId,
                  name: methodName,
                  type: methodType,
                  monthlyRates: methodRates.map((item: number) => item / methodRates[0])
                }))
                setIsOpen(false);
                router.reload();
              }
              }
            >Update</ModalButton>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
