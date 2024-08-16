'use client';

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { transportations } from '@/app/data/transportations';

interface PlanItemFormProps {
    plan: Plan,
    planItem?: PlanItem;
    onSubmit: (planItem: PlanItem) => void;
    onClose: () => void;
}

const PlanItemForm: React.FC<PlanItemFormProps> = ({ plan, planItem, onSubmit, onClose }) => {
    const [date, setDate] = useState(planItem ? new Date(planItem.date).toISOString().split('T')[0] : '');
    const [transportation, setTransportation] = useState(planItem ? planItem.transportation : '');
    const [transportationSuggestions, setTransportationSuggestions] = useState<string[]>([]);
    const [place, setPlace] = useState(planItem ? planItem.place : '');
    const [activity, setActivity] = useState(planItem ? planItem.activity : '');
    const [memo, setMemo] = useState(planItem ? planItem.memo : '');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dateOptions = getDateRange(plan.departureDate, plan.arrivalDate);

    function getDateRange(startDate: Date, endDate: Date): string[] {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateList: string[] = [];

        while (start <= end) {
            dateList.push(start.toISOString().split('T')[0]);
            start.setDate(start.getDate() + 1);
        }
        return dateList;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof plan?.id === 'undefined') return;

        try {
            const editPlanItem: PlanItem = {
                ...planItem,
                date: new Date(date),
                transportation,
                place,
                activity,
                memo,
                planId: plan.id ?? 0,
            };
            const uri = `/api/plan/${plan.id}/item/save`;
            const response = await axios.post(uri, editPlanItem);

            if (response.status == 200) {
                setDate('');
                setTransportation('');
                setPlace('');
                setActivity('');
                setMemo('');
                setShowSuggestions(false);

                onSubmit(editPlanItem);
            }
        } catch (error) {
            console.error('Error saving plan item:', error);
        }

    };

    const handleTransportationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setTransportation(input);

        const filteredSuggestions = transportations.filter((suggestion) =>
            suggestion.startsWith(input)
        );
        setTransportationSuggestions(filteredSuggestions);
    };

    const handleShowSuggestions = () => {
        setShowSuggestions(!showSuggestions);
        setTransportationSuggestions(transportations);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setTransportation(suggestion);
        setShowSuggestions(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="flex">
                <div className="flex flex-col w-1/2">
                    <label className="mb-2 font-semibold">日付:</label>
                    <select
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className=" p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option>日付を選択</option>
                        {dateOptions.map((dateOption) => (
                            <option key={dateOption} value={dateOption}>
                                {new Date(dateOption).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">交通手段:</label>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={handleShowSuggestions}
                            className="p-2 mx-2 text-sm rounded border border-blue-500 text-blue-500"
                        >
                            候補
                        </button>
                        <input
                            type="text"
                            value={transportation}
                            onChange={handleTransportationChange}
                            className="p-2 border border-gray-300 rounded-md flex-grow"
                            placeholder="交通手段を入力"
                        />
                    </div>
                    {showSuggestions && transportationSuggestions.length > 0 && (
                        <>
                            <ul className="z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-1/2">
                                {transportationSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col">
                <label className="mb-2 font-semibold">場所:</label>
                <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>


            <div className="flex flex-col">
                <label className="mb-2 font-semibold">アクティビティ:</label>
                <input
                    type="text"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-2 font-semibold">メモ:</label>
                <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="ms-3 py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PlanItemForm;