import ButtonComp from '@/app/components/button';
import Navbar from '@/app/components/navbar';
import { Card } from 'baseui/card';
import React, { useEffect } from 'react';
import { activateNavbar } from "@/app/store/api";
import { title } from "process";
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
import { addExpense, getCalculationMethodByTypeAndSiteId, getExpensesByPlanId, getPlansBySiteId } from "@/app/store/sites";
import { Select } from 'baseui/select';
import exp from 'constants';

export default function Plans() {
    const router = useRouter();
    const { slug } = router.query;

    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [expenseName, setExpenseName] = React.useState("");
    const [firstMonth, setFirstMonth] = React.useState("");
    const [selectedPredicted, setSelectedPredicted] = React.useState({} as any);
    const [selectedPeriodic, setSelectedPeriodic] = React.useState({} as any);
    const expenses = useAppSelector((state) => state.sites.expenses);
    const predictedMethods = useAppSelector((state) => state.sites.calculationMethodOptions?.predicted);
    const periodicMethods = useAppSelector((state) => state.sites.calculationMethodOptions?.periodic);
  
    useEffect(() => {
        console.log(slug, "slug");
        dispatch(getExpensesByPlanId(slug as string));
    }
        , [slug]);

    useEffect(() => {
       
        const siteId = localStorage.getItem("siteId") || "";
        dispatch(getCalculationMethodByTypeAndSiteId({ site_id: siteId, type: "predicted" }));
        dispatch(getCalculationMethodByTypeAndSiteId({ site_id: siteId, type: "periodic" }));
    }
        , []);

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-screen">
                <Card>
                    <div className="w-[800px]  p-4  sm:p-8 ">
                        <div className="flex flex-row items-center justify-between gap-2 mb-4">
                            <div>
                                <h5 className="text-xl font-bold leading-none text-gray-900 ">
                                    Expenses
                                </h5>
                            </div>
                            <ButtonComp
                                onClick={() => {
                                    setIsOpen(true);
                                }}
                                label="Add Expense"
                                size="small"
                                type="addResidence"
                            />
                        </div>
                        <div className="flow-root">
                            {expenses &&  (
                            <ul role="list" className="divide-y divide-gray-200">
                                {expenses?.map((item, index: number) => (
                                    <li key={index} className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ">
                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                    Name
                                                </p>
                                                <p className="text-sm text-gray-500 truncate ">
                                                    {item.name || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                    First Month
                                                </p>
                                                <p className="text-sm text-gray-500 truncate ">
                                                    {item.firstMonth || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                    Monthly
                                                </p>
                                                <p className="text-sm text-gray-500 truncate ">
                                                    {item.monthly || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                    Total
                                                </p>
                                                <p className="text-sm text-gray-500 truncate ">
                                                    {item.total || "N/A"}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center min-w-0 ms-4">
                                                <ButtonComp
                                                    onClick={() => {
                                                        router.push(`plans/${item._id}`);
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
                            )}
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
                    <ModalHeader>New Expense</ModalHeader>
                    <div className="px-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <span className=" text-black text-sm font-medium">Expense Name</span>
                            <InputField
                                value={expenseName}
                                setValue={setExpenseName}
                                placeholder="Enter Expense Name.."
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <span className=" text-black text-sm font-medium">First Month</span>
                            <InputField
                                value={firstMonth}
                                setValue={setFirstMonth}
                                placeholder="Enter First Month Amount.."
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <span className=" text-black text-sm font-medium">Usage Based -periodic</span>
                            <Select
                                options={periodicMethods}
                                value={selectedPeriodic}
                                placeholder="Select"
                                onChange={(e: any) => setSelectedPeriodic(e.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <span className=" text-black text-sm font-medium">Unit-price Based -predicted</span>
                            <Select
                                options={predictedMethods}
                                value={selectedPredicted}
                                placeholder="Select"
                                onChange={(e: any) => setSelectedPredicted(e.value)}
                            />
                        </div>

                    </div>
                    <ModalFooter>
                        <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
                        <ModalButton
                        onClick={() => {
                            dispatch(addExpense(
                                {
                                    plan_id: slug as string,
                                    name: expenseName,
                                    firstMonth: Number(firstMonth),
                                    periodicCalculationMethod: selectedPeriodic[0]?.id,
                                    predictedCalculationMethod: selectedPredicted[0]?.id
                                }
                            ));
                            setIsOpen(false);
                        }}
                        >Add</ModalButton>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}