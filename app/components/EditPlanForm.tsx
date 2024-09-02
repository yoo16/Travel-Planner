'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/app/context/LoadingContext';
import { DateRange } from 'react-date-range';
import { ja } from 'date-fns/locale';
interface EditPlanProps {
    editingPlan: Plan,
}

const EditPlanForm: React.FC<EditPlanProps> = ({ editingPlan }) => {
    const { setLoading } = useLoading();
    const router = useRouter();

    const [plan, setPlan] = useState<Plan>(editingPlan);
    const [range, setRange] = useState([
        {
            startDate: new Date(plan.departureDate),
            endDate: new Date(plan.arrivalDate),
            key: 'selection',
        },
    ]);
    const [errors, setErrors] = useState<{ departure?: string; destination?: string }>({});

    if (!editingPlan) return;

    const validateForm = () => {
        const newErrors: { departure?: string; destination?: string } = {};
        if (!plan.departure) {
            newErrors.departure = "出発地を入力してください";
        }
        if (!plan.destination) {
            newErrors.destination = "目的地を入力してください";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlan(prevPlan => ({
            ...prevPlan,
            [name]: value
        }));
    };

    const handleSelect = (ranges: any) => {
        setRange([ranges.selection]);
        setPlan(prevPlan => ({
            ...prevPlan,
            departureDate: ranges.selection.startDate,
            arrivalDate: ranges.selection.endDate,
        }));
    };

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlan(prevPlan => ({
            ...prevPlan,
            budget: parseInt(e.target.value, 10)
        }));
    };

    const onUpdate = async () => {
        if (!validateForm()) return;
        try {
            setLoading(true);
            const uri = `/api/plan/${plan.id}/update`;
            await axios.post(uri, plan);
            router.push(`/plan/${plan.id}`);
        } catch (error) {
            console.error('Error saving plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        if (!plan.id) return;
        try {
            setLoading(true);
            await axios.post(`/api/plan/${plan.id}/delete`);
            router.push(`/plan/${plan.id}`);
        } catch (error) {
            console.error('Error deleting plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const onCancel = async () => {
        try {
            setLoading(true);
            router.push(`/user/plan/${plan.id}`);
        } catch (error) {
            console.error('Error saving plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
                <div className="">
                    <div className="mb-3 py-1 px-2 rounded bg-green-500 text-white text-sm">
                        出発地 - 目的地
                    </div>
                    <div className="flex">
                        <div className="w-1/2 me-2">
                            <input
                                type="text"
                                name="departure"
                                value={plan.departure}
                                onChange={handleInputChange}
                                className={`p-2 w-full border ${errors.departure ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.departure && (
                                <p className="text-red-500 text-sm mt-1">{errors.departure}</p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <input
                                type="text"
                                name="destination"
                                value={plan.destination}
                                onChange={handleInputChange}
                                className={`p-2 w-full border ${errors.destination ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.destination && (
                                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-2 py-1 px-2 rounded bg-green-500 text-white text-sm">
                        日程
                    </div>
                    <div className="flex justify-center">
                        <DateRange
                            ranges={range}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            rangeColors={['#3b82f6']}
                            locale={ja}
                            dateDisplayFormat={'yyyy/MM/dd'}
                            editableDateInputs={true}
                        />
                    </div>
                </div>
                <div>
                    <div className="my-2 py-1 px-2 rounded bg-green-500 text-white text-sm">
                        予算
                    </div>
                    <div>
                        <input
                            type="number"
                            min="0"
                            max="1000000"
                            step="5000"
                            value={plan.budget}
                            onChange={handleBudgetChange}
                            className="w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                        <span className="ms-2">
                            円
                        </span>

                    </div>
                    <input

                        type="range"
                        min="0"
                        max="1000000"
                        step="5000"
                        value={plan.budget}
                        onChange={handleBudgetChange}
                        className="mt-2 p-0 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="mb-2 py-1 px-2 rounded bg-green-500 text-white text-sm">
                        キーワード
                    </div>
                    <input
                        type="text"
                        name="keywords"
                        value={plan.keywords}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={onUpdate}
                        className="me-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        更新
                    </button>
                    <button
                        onClick={onDelete}
                        className="me-2 py-2 px-4 border bg-red-500 text-white rounded-md"
                    >
                        削除
                    </button>
                    <button
                        onClick={onCancel}
                        className="py-2 px-4 border border-blue-500 text-blue-500 font-semibold rounded-md"
                    >
                        戻る
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditPlanForm;
