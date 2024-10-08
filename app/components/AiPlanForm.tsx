'use client'

import React, { useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ja } from 'date-fns/locale';
import KeywordInput from './KeywordInput';
import { useLoading } from '../context/LoadingContext';
import axios from 'axios';

interface TravelFormProps {
    onAiCreate: (plan: Plan, planItems:PlanItem[][]) => void;
    onClose: () => void;
    editPlan?: Plan,
}

const initPlan: Plan = {
    departure: '',
    destination: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    budget: 30000,
    keywords: '',
}

const AiPlanForm = ({ onAiCreate, onClose, editPlan }:TravelFormProps) => {
    const { setLoading } = useLoading();

    const [plan, setPlan] = useState<Plan>(editPlan ? editPlan : initPlan);
    const [range, setRange] = useState([
        {
            startDate: new Date(plan.departureDate),
            endDate: new Date(plan.arrivalDate),
            key: 'selection',
        },
    ]);
    const [errors, setErrors] = useState<ErrorMessages>({});

    const topRef = useRef<HTMLDivElement>(null);

    const validateForm = () => {
        const newErrors: ErrorMessages = {};

        if (!plan.departure) {
            newErrors.departure = "出発地を入力してください";
        }
        if (!plan.destination) {
            newErrors.destination = "目的地を入力してください";
        }
        setErrors(newErrors);
        if (newErrors) {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleSelect = (ranges: any) => {
        setRange([ranges.selection]);
        setPlan(prevPlan => ({
            ...prevPlan,
            departureDate: ranges.selection.startDate,
            arrivalDate: ranges.selection.endDate,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlan(prevPlan => ({
            ...prevPlan,
            [name]: value
        }));
    };

    const handleKeywordsChange = (keywords: string) => {
        setPlan(prev => ({
            ...prev,
            keywords,
        }));
    };

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlan(prevPlan => ({
            ...prevPlan,
            budget: parseInt(e.target.value, 10)
        }));
    };

    const handleAiCreate = async () => {
        if (validateForm()) {
            if (confirm('AIプランを作成しますか？')) {
                try {
                    setLoading(true);
                    const response = await axios.post('/api/ai/create', plan);
                    console.log(response.data)
                    if (response.data.error) {
                        setErrors(response.data.error);
                    } else {
                        const plan = response.data;
                        const planItems = response.data.planItems;
                        onAiCreate(plan, planItems);
                    }
                } catch (error) {
                    console.error('Error creating travel plan:', error);
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    const handleClose = async () => {
        onClose();
    };

    return (
        <div
            className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
            ref={topRef}
        >
            {errors.general && (
                <div className="mb-4 text-red-500 text-sm">
                    {errors.general}
                </div>
            )}
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
            <div className="">
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
            <div className="">
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
            <div className="">
                <KeywordInput
                    onKeywordsChange={handleKeywordsChange}
                />
            </div>

            <div className="flex justify-center">
                <button onClick={handleAiCreate} type="button" className="mx-1 py-2 px-4 bg-blue-500 text-white rounded-md">
                    AIプラン作成
                </button>
                <button onClick={handleClose} type="button" className="mx-1 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-md">
                    戻る
                </button>
            </div>
        </div>
    );
};

export default AiPlanForm;
