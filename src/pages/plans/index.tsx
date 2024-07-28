import ButtonComp from "@/app/components/button";
import Navbar from "@/app/components/navbar";
import { activateNavbar } from "@/app/store/api";
import { Card } from "baseui/card";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
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
import { addPlan, getExpensesByPlanId, getPlansBySiteId } from "@/app/store/sites";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";

export default function ResidenceDetails() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [planName, setPlanName] = React.useState("");
  const [planYear, setPlanYear] = React.useState("");
  const plans = useAppSelector((state) => state.sites.plans);

  useEffect(() => {
    dispatch(activateNavbar());
  }, [dispatch]);

  const router = useRouter();

  useEffect(() => {
    const siteId = localStorage.getItem("siteId") || "";
    console.log(siteId, "siteId");
    dispatch(getPlansBySiteId(siteId));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-4 ">
        <div className="w-full h-4/5 md:w-4/5 md:h-4/5  mt-12">
            <div className="px-4 py-6 bg-white border border-gray-200 rounded-lg shadow
            max-h-[750px]  overflow-y-auto
            ">
            <div className="cursor-pointer" onClick={router.back}>
              <Icon path={mdiChevronLeft} size={1} color="black" />
            </div>
            <div className="p-6 sm:p-10">
              <div className="flex flex-row items-center justify-between gap-2 mb-4">
                <div>
                  <h5 className="text-xl font-bold leading-none text-gray-900">Plans</h5>
                </div>
                <ButtonComp
                  onClick={() => setIsOpen(true)}
                  label="Add Plan"
                  size="small"
                  type="addResidence"
                />
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                  {plans && plans.length >= 0 ? (
                    plans.map((item, index) => (
                      <li key={index} className="py-3 sm:py-4">
                        <div className="flex flex-wrap items-center">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Name</p>
                            <p className="text-sm text-gray-500 truncate">{item.name}</p>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Year</p>
                            <p className="text-sm text-gray-500 truncate">{item.year}</p>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">Total</p>
                            <p className="text-sm text-gray-500 truncate">
                              {Number(item.total).toFixed(2) + "₺"}
                            </p>
                          </div>
                          <div className="inline-flex items-center min-w-0 ms-4">
                            <ButtonComp
                              onClick={() => {
                                router.push(`plans/${item._id}`);
                                dispatch(getExpensesByPlanId(item._id));
                              }}
                              label="View Plan"
                              size="small"
                              outlined
                            />
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Plan not found! You can add a new plan.
                          </p>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            </div>
      
        </div>
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
              <span className="text-black text-sm font-medium">Plan Name</span>
              <InputField
                value={planName}
                setValue={setPlanName}
                placeholder="Enter Plan Name.."
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-black text-sm font-medium">Plan Year</span>
              <InputField
                value={planYear}
                setValue={setPlanYear}
                type="number"
                placeholder="Enter Plan Year.."
              />
            </div>
          </div>
          <ModalFooter>
            <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
            <ModalButton
              onClick={() => {
                const siteId = localStorage.getItem("siteId") || "";
                dispatch(addPlan({ site_id: siteId, name: planName, year: Number(planYear) }));
                setIsOpen(false);
                router.reload();
              }}
            >
              Add
            </ModalButton>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
