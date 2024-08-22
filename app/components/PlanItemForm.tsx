'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { transportations } from '@/app/data/transportations';
import { dateList, dateToString } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';

interface PlanItemFormProps {
    plan: Plan,
    planItem: PlanItem;
    onSubmit: (planItem: PlanItem) => void;
    onClose: () => void;
    onDelete: (planItemId: number) => void;
}

const PlanItemForm: React.FC<PlanItemFormProps> = ({ plan, planItem, onSubmit, onClose, onDelete }) => {
    const { setLoading } = useLoading();
    const [editPlanItem, setEditPlanItem] = useState<PlanItem>(planItem);

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [transportationSuggestions, setTransportationSuggestions] = useState<string[]>([]);

    const dateOptions = dateList(plan.departureDate, plan.arrivalDate);
    console.log("dateOptions:", dateOptions);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditPlanItem(prevPlanItem => ({
            ...prevPlanItem,
            [name]: value
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditPlanItem(prevPlanItem => ({
            ...prevPlanItem,
            [name]: new Date(value).toISOString()
        }));
    };

    const onUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof plan?.id === 'undefined') return;

        try {
            setLoading(true);
            const uri = `/api/plan_item/${editPlanItem.id}/update`;
            const response = await axios.post(uri, editPlanItem);

            if (response.status == 200) {
                onSubmit(editPlanItem);
            }
        } catch (error) {
            console.error('Error saving plan item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!planItem || !planItem.id) return;
        try {
            setLoading(true);
            const uri = `/api/plan_item/${planItem.id}/delete`;
            const response = await axios.post(uri);

            if (response.status == 200) {
                onDelete(planItem.id);
            }
        } catch (error) {
            console.error('Error deleting plan item:', error);
        } finally {
            setLoading(true);
        }
    };

    const handleTransportationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const input = e.target.value;
        setEditPlanItem(prevPlanItem => ({
            ...prevPlanItem,
            transportation: input
        }));

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
        setEditPlanItem(prevPlanItem => ({
            ...prevPlanItem,
            transportation: suggestion
        }));
        setShowSuggestions(false);
    };

    return (
        <>
            <div className="space-y-6 p-6 bg-gray-50 rounded-md shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">日付</label>
                        <select
                            name="date"
                            value={dateToString(editPlanItem.date)}
                            onChange={handleDateChange}
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        >
                            {dateOptions.map((dateOption) => (
                                <option key={dateOption} value={dateOption}>
                                    {new Date(dateOption).toLocaleDateString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">移動</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                name="transportation"
                                value={editPlanItem.transportation}
                                onChange={handleTransportationChange}
                                className="p-2 flex-grow border border-gray-300 rounded-md"
                                placeholder="移動手段を入力"
                            />
                            <button
                                type="button"
                                onClick={handleShowSuggestions}
                                className="ml-2 p-2 text-sm border border-blue-500 text-blue-500 rounded-md"
                            >
                                候補
                            </button>
                        </div>
                        {showSuggestions && transportationSuggestions.length > 0 && (
                            <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
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
                        )}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">場所</label>
                    <input
                        type="text"
                        name="place"
                        value={editPlanItem.place}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">アクティビティ</label>
                    <input
                        type="text"
                        name="activity"
                        value={editPlanItem.activity}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">宿泊先</label>
                    <input
                        type="text"
                        name="accommodation"
                        value={editPlanItem.accommodation}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>


                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">予算</label>
                    <input
                        type="text"
                        name="budget"
                        value={editPlanItem.budget}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">Memo</label>
                    <textarea
                        name="memo"
                        value={editPlanItem.memo}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-between space-x-3">
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onUpdate}
                            className="py-2 px-4 text-sm bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="py-2 px-4 text-sm bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 text-sm bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlanItemForm;
