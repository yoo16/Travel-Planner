'use client';

import React, { useState } from 'react';
import { FaFloppyDisk, FaTrash, FaXmark } from 'react-icons/fa6';
import { transportations } from '@/app/data/transportations';
import { dateList, dateToString } from '@/app/services/Date';

interface PlanItemFormProps {
    plan: Plan;
    planItem: PlanItem;
    onSubmit: (planItem: PlanItem) => void;
    onClose: () => void;
    onDelete: (planItemId: number) => void;
}

const PlanItemForm: React.FC<PlanItemFormProps> = ({ plan, planItem, onSubmit, onClose, onDelete }) => {
    const [editPlanItem, setEditPlanItem] = useState<PlanItem>({
        ...planItem,
        transportation: planItem.transportation ?? '',
        place: planItem.place ?? '',
        activity: planItem.activity ?? '',
        memo: planItem.memo ?? '',
        accommodation: planItem.accommodation ?? '',
        budget: planItem.budget ?? 0,
    });
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [transportationSuggestions, setTransportationSuggestions] = useState<string[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const dateOptions = dateList(plan.departureDate, plan.arrivalDate);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setEditPlanItem((prevPlanItem) => ({
            ...prevPlanItem,
            [name]: name === 'budget' ? parseInt(value || '0', 10) : value,
        }));
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEditPlanItem((prevPlanItem) => ({
            ...prevPlanItem,
            date: new Date(event.target.value),
        }));
    };

    const onUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (typeof plan.id === 'undefined') return;

        try {
            setIsUpdating(true);
            const response = await fetch(`/api/plan_item/${editPlanItem.id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editPlanItem),
            });

            if (response.ok) {
                onSubmit(editPlanItem);
            }
        } catch (error) {
            console.error('Error saving plan item:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!planItem.id) return;

        try {
            setIsDeleting(true);
            const response = await fetch(`/api/plan_item/${planItem.id}/delete`, {
                method: 'POST',
            });

            if (response.ok) {
                onDelete(planItem.id);
            }
        } catch (error) {
            console.error('Error deleting plan item:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleTransportationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setEditPlanItem((prevPlanItem) => ({
            ...prevPlanItem,
            transportation: input,
        }));

        setTransportationSuggestions(
            transportations.filter((suggestion) => suggestion.startsWith(input)),
        );
    };

    const handleShowSuggestions = () => {
        setShowSuggestions((current) => !current);
        setTransportationSuggestions(transportations);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setEditPlanItem((prevPlanItem) => ({
            ...prevPlanItem,
            transportation: suggestion,
        }));
        setShowSuggestions(false);
    };

    return (
        <form onSubmit={onUpdate} className="space-y-5">
            <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Schedule item</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">予定を編集</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">日付</span>
                    <select
                        name="date"
                        value={dateToString(editPlanItem.date)}
                        onChange={handleDateChange}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        required
                    >
                        {dateOptions.map((dateOption) => (
                            <option key={dateOption} value={dateOption}>
                                {new Date(dateOption).toLocaleDateString('ja-JP')}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">予算</span>
                    <input
                        type="number"
                        name="budget"
                        value={editPlanItem.budget ?? 0}
                        onChange={handleInputChange}
                        className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />
                </label>
            </div>

            <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">移動</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="transportation"
                        value={editPlanItem.transportation}
                        onChange={handleTransportationChange}
                        className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        placeholder="移動手段を入力"
                    />
                    <button
                        type="button"
                        onClick={handleShowSuggestions}
                        className="h-11 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                    >
                        候補
                    </button>
                </div>
                {showSuggestions && transportationSuggestions.length > 0 && (
                    <ul className="mt-2 max-h-40 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-sm">
                        {transportationSuggestions.map((suggestion) => (
                            <li key={suggestion}>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                >
                                    {suggestion}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">場所</span>
                    <input
                        type="text"
                        name="place"
                        value={editPlanItem.place}
                        onChange={handleInputChange}
                        className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        required
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">宿泊先</span>
                    <input
                        type="text"
                        name="accommodation"
                        value={editPlanItem.accommodation}
                        onChange={handleInputChange}
                        className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />
                </label>
            </div>

            <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">アクティビティ</span>
                <input
                    type="text"
                    name="activity"
                    value={editPlanItem.activity}
                    onChange={handleInputChange}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    required
                />
            </label>

            <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Memo</span>
                <textarea
                    name="memo"
                    value={editPlanItem.memo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
            </label>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isUpdating || isDeleting}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        <FaFloppyDisk aria-hidden="true" />
                        {isUpdating ? '更新中...' : '更新'}
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isUpdating || isDeleting}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        <FaTrash aria-hidden="true" />
                        {isDeleting ? '削除中...' : '削除'}
                    </button>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                >
                    <FaXmark aria-hidden="true" />
                    閉じる
                </button>
            </div>
        </form>
    );
};

export default PlanItemForm;
