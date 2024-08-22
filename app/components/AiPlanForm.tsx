'use client'

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ja } from 'date-fns/locale';

interface TravelFormProps {
    onAiCreate: (plan: Plan) => void;
    onCancel: () => void;
    editPlan?: Plan,
}

const initPlan: Plan = {
    departure: '',
    destination: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    budget: 30000,
    keyword: '',
}

const AiPlanForm: React.FC<TravelFormProps> = ({ onAiCreate, onCancel, editPlan }) => {
    const [plan, setPlan] = useState<Plan>(editPlan ? editPlan : initPlan);
    const [range, setRange] = useState([
        {
            startDate: new Date(plan.departureDate),
            endDate: new Date(plan.arrivalDate),
            key: 'selection',
        },
    ]);

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

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlan(prevPlan => ({
            ...prevPlan,
            budget: parseInt(e.target.value, 10)
        }));
    };

    const handleAiCreate = async () => {
        onAiCreate(plan);
    };

    const handleCancel = async () => {
        onCancel();
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">出発地 - 目的地:</label>
                <div className="flex">
                    <input
                        type="text"
                        name="departure"
                        value={plan.departure}
                        onChange={handleInputChange}
                        className="me-2 w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="destination"
                        value={plan.destination}
                        onChange={handleInputChange}
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">出発日 - 到着日:</label>
                <DateRange
                    ranges={range}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    rangeColors={['#3b82f6']}
                    locale={ja}
                    editableDateInputs={true}
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-lg">
                    予算:
                </label>
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
                <label className="mb-2 font-semibold text-lg">キーワード:</label>
                <input
                    type="text"
                    name="keyword"
                    value={plan.keyword}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-center">
                <button onClick={handleAiCreate} type="button" className="mx-1 py-2 px-4 bg-blue-500 text-white rounded-md">
                    AI Plan
                </button>
                <button onClick={handleCancel} type="button" className="mx-1 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-md">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AiPlanForm;
