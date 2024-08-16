'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Loading from './Loading';
import { dateToString } from '@/app/services/Date';

interface CreatePlanFormProps {
    onSave: (plan: Plan) => void;
    onClose: () => void;
}

const initPlan:Plan = {
    departure: '',
    destination: '',
    departureDate: new Date(),
    arrivalDate: new Date(),
    budget: 30000,
    keyword: '',
}

const CreatePlanForm: React.FC<CreatePlanFormProps> = ({ onSave, onClose }) => {
    const [plan, setPlan] = useState<Plan>(initPlan);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlan(prevPlan => ({
            ...prevPlan,
            [name]: value
        }));
        console.log(plan)
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setPlan(prevPlan => ({
            ...prevPlan,
            [name]: new Date(value).toISOString()
        }));
        console.log(plan)
    };

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlan(prevPlan => ({
            ...prevPlan,
            budget: parseInt(e.target.value, 10)
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const uri = `/api/plan/save`;
            await axios.post(uri, plan);
            onSave(plan);
        } catch (error) {
            console.error('Error saving plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
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
                    <div className="flex">
                        <input
                            type="date"
                            name="departureDate"
                            value={dateToString(plan.departureDate)}
                            onChange={handleDateChange}
                            className="w-1/2 me-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            name="arrivalDate"
                            value={dateToString(plan.departureDate)}
                            onChange={handleDateChange}
                            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                    <button
                        onClick={handleSave}
                        className="me-3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="py-2 px-4 border border-blue-500 text-blue-500 font-semibold rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreatePlanForm;
