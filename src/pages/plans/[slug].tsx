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
import { addExpense, getCalculationMethodByTypeAndSiteId, getExpensesByPlanId, getPlanById, getPlansBySiteId, updateExpenseById } from "@/app/store/sites";
import { Select } from 'baseui/select';
import exp from 'constants';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiPencilOutline } from '@mdi/js';
import { toaster } from 'baseui/toast';

export default function Plans() {
    const router = useRouter();
    const { slug } = router.query;

    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isViewExpenseOpen, setIsViewExpenseOpen] = React.useState(false);
    const [isTotalOpen, setIsTotalOpen] = React.useState(false);
    const [expenseName, setExpenseName] = React.useState("");
    const [firstMonth, setFirstMonth] = React.useState("");
    const [selectedPredicted, setSelectedPredicted] = React.useState({} as any);
    const [selectedPeriodic, setSelectedPeriodic] = React.useState({} as any);
    const [selectedExpense, setSelectedExpense] = React.useState({} as any);
    const [selectedPeriodicOption, setSelectedPeriodicOption] = React.useState({} as any);
    const [selectedPredictedOption, setSelectedPredictedOption] = React.useState({} as any);
    const [selectedFirstMonth, setSelectedFirstMonth] = React.useState({} as any);
    const [selectedExpenseName, setSelectedExpenseName] = React.useState({} as any);
    const [currentPlan, setCurrentPlan] = React.useState({} as any);

    const expenses = useAppSelector((state) => state.sites.expenses);
    const predictedMethods = useAppSelector((state) => state.sites.calculationMethodOptions?.predicted);
    const periodicMethods = useAppSelector((state) => state.sites.calculationMethodOptions?.periodic);

    useEffect(() => {
        console.log(slug, "slug");
        if (slug != undefined) {
            dispatch(getExpensesByPlanId(slug as string));
            dispatch(getPlanById(slug as string)).then
                ((res) => {
                    setCurrentPlan(res.payload.data);
                    console.log(res.payload.data, "abcdf");
                });
        }
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
                    <div className=" cursor-pointer" onClick={router.back}>
                        <Icon path={mdiChevronLeft} size={1} color="black" />
                    </div>
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
                            {expenses && (
                                <ul role="list" className="divide-y divide-gray-200">
                                    {expenses.length >= 0 ? (<>
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
                                                            Total
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                            {Number(item.total).toFixed(2) + '₺' || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center min-w-0 ms-4">
                                                        <ButtonComp
                                                            onClick={() => {
                                                                setSelectedExpense(item);
                                                                setSelectedPeriodicOption(item.periodicCalculationMethod ? [{ id: item?.periodicCalculationMethod?._id, label: item?.periodicCalculationMethod?.name }] : null);
                                                                setSelectedPredictedOption(item.predictedCalculationMethod ? [{ id: item?.predictedCalculationMethod?._id, label: item?.predictedCalculationMethod?.name }] : null);
                                                                setSelectedFirstMonth(item.firstMonth);
                                                                setSelectedExpenseName(item.name);
                                                                setIsViewExpenseOpen(true);
                                                            }}
                                                            label="View Expense"
                                                            size="small"
                                                            outlined
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                            <li  className="py-3 sm:py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-1 min-w-0 ">
                                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                        </p>
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                        </p>
                                                    </div>

                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-medium text-gray-900 truncate ">
                                                            Total
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate ">
                                                            {Number(currentPlan.total).toFixed(2) + '₺' || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center min-w-0 ms-4">
                                                        <ButtonComp
                                                            onClick={() => {
                                                                setIsTotalOpen(true);
                                                            }}
                                                            label="View Monthly"
                                                            size="small"
                                                            outlined
                                                        />
                                                    </div>
                                                </div>
                                            </li></>) :
                                        (<li className="py-3 sm:py-4">
                                            <div className="flex items-center">
                                                <div className="flex-1 min-w-0 ">
                                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                                        Expense not found! You can add a new expense.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>)}

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
                                router.reload();
                            }}
                        >Add</ModalButton>
                    </ModalFooter>
                </Modal>
                <Modal
                    onClose={() => { setIsViewExpenseOpen(false); router.reload(); }}
                    closeable
                    isOpen={isViewExpenseOpen}
                    animate
                    autoFocus
                    size={SIZE.auto}
                    role={ROLE.dialog}
                >
                    <ModalHeader>Selected Expense</ModalHeader>
                    <ModalBody>
                        <div className='flex flex-row gap-4 px-2 '>
                            <div className='px-4 flex flex-col gap-4 w-full'>
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {selectedExpense?.monthly?.map((item: any, index: number) => (
                                        <div key={index}>
                                            <span className=" text-black text-sm font-medium">Month {index + 1}</span>
                                            <InputField
                                                value={Number(item).toFixed(2) + "₺"}
                                                isDisabled
                                                placeholder="Enter Expense Name.."
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className='w-full'>
                                    <span className=" text-black text-sm font-medium">Total Amount</span>
                                    <InputField
                                        value={Number(selectedExpense.total).toFixed(2) + "₺"}
                                        isDisabled
                                        placeholder="Enter Expense Name.."
                                    />
                                </div>
                            </div>
                            <div className="px-4 flex flex-col gap-8 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <span className=" text-black text-sm font-medium">Expense Name</span>
                                    <InputField
                                        value={selectedExpenseName}
                                        setValue={setSelectedExpenseName}
                                        placeholder="Enter Expense Name.."
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <span className=" text-black text-sm font-medium">First Month</span>
                                    <InputField
                                        value={selectedFirstMonth}
                                        setValue={setSelectedFirstMonth}
                                        regex={"numberRegex"}
                                        placeholder="Enter First Month Amount.."
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <span className=" text-black text-sm font-medium">Usage Based -periodic</span>
                                    <Select
                                        options={periodicMethods}
                                        value={selectedPeriodicOption}
                                        placeholder="Select"
                                        onChange={(e: any) => setSelectedPeriodicOption(e.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <span className=" text-black text-sm font-medium">Unit-price Based -predicted</span>
                                    <Select
                                        options={predictedMethods}
                                        value={selectedPredictedOption}
                                        placeholder="Select"
                                        onChange={(e: any) => setSelectedPredictedOption(e.value)}
                                    />
                                </div>

                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <ModalButton kind={ButtonKind.tertiary}
                            onClick={() => { setIsViewExpenseOpen(false); router.reload(); }}
                        >Cancel</ModalButton>
                        <ModalButton
                            onClick={() => {
                                if (selectedExpenseName === "" || selectedFirstMonth === "") {
                                    toaster.negative("Please fill all fields", {});
                                    return;
                                }
                                else {
                                    dispatch(updateExpenseById(
                                        {
                                            expense_id: selectedExpense._id,
                                            plan_id: slug as string,
                                            name: selectedExpenseName,
                                            firstMonth: Number(selectedFirstMonth),
                                            periodicCalculationMethod: selectedPeriodicOption && selectedPeriodicOption[0] ? selectedPeriodicOption[0]?.id : null,
                                            predictedCalculationMethod: selectedPredictedOption && selectedPredictedOption[0] ? selectedPredictedOption[0]?.id : null
                                        }
                                    )).then((res) => { setSelectedExpense(res.payload.data) })
                                    setIsOpen(false);
                                    // 
                                }




                            }}
                        >Update</ModalButton>
                    </ModalFooter>
                </Modal>


                <Modal
                    onClose={() => { setIsTotalOpen(false) }}
                    closeable
                    isOpen={isTotalOpen}
                    animate
                    autoFocus
                    size={SIZE.auto}
                    role={ROLE.dialog}
                >
                    <ModalHeader>Monthly Amounts</ModalHeader>
                    <ModalBody>
                        <div className='grid grid-cols-3 gap-2'>
                        {currentPlan?.monthlyTotals?.map((item: any, index: number) => (
                            <div key={index} className='mt-3'>
                                <span className=" text-black text-sm font-medium">Month {index + 1}</span>
                                <InputField
                                    value={Number(item).toFixed(2) + "₺"}
                                    isDisabled
                                    placeholder="Enter Expense Name.."
                                />
                            </div>
                        ))}
                        <div className='col-span-2'></div>
                        <div className='mt-3'>
                                <span className=" text-black text-sm font-medium">Total</span>
                                <InputField
                                    value={Number(currentPlan.total).toFixed(2) + "₺"}
                                    isDisabled
                                    placeholder="Enter Expense Name.."
                                />
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

            </div>
        </>
    );
}