'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import { ja } from 'date-fns/locale';
import { FaArrowRotateLeft, FaFloppyDisk, FaLocationDot, FaTrash, FaWallet } from 'react-icons/fa6';

interface EditPlanProps {
    editingPlan: Plan;
}

const EditPlanForm: React.FC<EditPlanProps> = ({ editingPlan }) => {
    const router = useRouter();

    const [plan, setPlan] = useState<Plan>({
        ...editingPlan,
        budget: editingPlan.budget ?? 0,
        keywords: editingPlan.keywords ?? '',
    });
    const [range, setRange] = useState([
        {
            startDate: new Date(editingPlan.departureDate),
            endDate: new Date(editingPlan.arrivalDate),
            key: 'selection',
        },
    ]);
    const [errors, setErrors] = useState<{ departure?: string; destination?: string }>({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const validateForm = () => {
        const newErrors: { departure?: string; destination?: string } = {};

        if (!plan.departure) {
            newErrors.departure = '出発地を入力してください';
        }

        if (!plan.destination) {
            newErrors.destination = '目的地を入力してください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setPlan((prevPlan) => ({
            ...prevPlan,
            [name]: value,
        }));
    };

    const handleSelect = (ranges: any) => {
        setRange([ranges.selection]);
        setPlan((prevPlan) => ({
            ...prevPlan,
            departureDate: ranges.selection.startDate,
            arrivalDate: ranges.selection.endDate,
        }));
    };

    const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlan((prevPlan) => ({
            ...prevPlan,
            budget: parseInt(event.target.value || '0', 10),
        }));
    };

    const onUpdate = async () => {
        if (!validateForm()) return;

        try {
            setIsUpdating(true);
            const planPayload = {
                departure: plan.departure,
                destination: plan.destination,
                departureDate: plan.departureDate,
                arrivalDate: plan.arrivalDate,
                budget: plan.budget ?? null,
                keywords: plan.keywords ?? '',
            };
            const response = await fetch(`/api/plan/${plan.id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planPayload),
            });

            if (response.ok) {
                router.refresh();
                router.push(`/user/plan/${plan.id}`);
            }
        } catch (error) {
            console.error('Error saving plan:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const onDelete = async () => {
        if (!plan.id) return;

        try {
            setIsDeleting(true);
            const response = await fetch(`/api/plan/${plan.id}/delete`, {
                method: 'POST',
            });

            if (response.ok) {
                router.refresh();
                router.push('/user/plan');
            }
        } catch (error) {
            console.error('Error deleting plan:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const onCancel = () => {
        router.push(`/user/plan/${plan.id}`);
    };

    return (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="border-b border-slate-100 pb-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Basic info</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">基本情報</h2>
            </div>

            <div className="mt-5 space-y-6">
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <FaLocationDot className="text-emerald-600" aria-hidden="true" />
                        出発地 - 目的地
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                        <div>
                            <input
                                type="text"
                                name="departure"
                                value={plan.departure}
                                onChange={handleInputChange}
                                placeholder="出発地"
                                className={`h-11 w-full rounded-md border px-3 text-sm text-slate-900 outline-none transition focus:ring-4 focus:ring-emerald-100 ${errors.departure ? 'border-red-400' : 'border-slate-300 focus:border-emerald-500'}`}
                            />
                            {errors.departure && <p className="mt-1 text-sm font-semibold text-red-600">{errors.departure}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="destination"
                                value={plan.destination}
                                onChange={handleInputChange}
                                placeholder="目的地"
                                className={`h-11 w-full rounded-md border px-3 text-sm text-slate-900 outline-none transition focus:ring-4 focus:ring-emerald-100 ${errors.destination ? 'border-red-400' : 'border-slate-300 focus:border-emerald-500'}`}
                            />
                            {errors.destination && <p className="mt-1 text-sm font-semibold text-red-600">{errors.destination}</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">日程</label>
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <DateRange
                            ranges={range}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            rangeColors={['#059669']}
                            locale={ja}
                            dateDisplayFormat="yyyy/MM/dd"
                            editableDateInputs
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                        <FaWallet className="text-emerald-600" aria-hidden="true" />
                        予算
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="0"
                            max="1000000"
                            step="5000"
                            value={plan.budget ?? 0}
                            onChange={handleBudgetChange}
                            className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                        />
                        <span className="text-sm font-bold text-slate-600">円</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="5000"
                        value={plan.budget ?? 0}
                        onChange={handleBudgetChange}
                        className="mt-3 w-full accent-emerald-600"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">キーワード</label>
                    <input
                        type="text"
                        name="keywords"
                        value={plan.keywords ?? ''}
                        onChange={handleInputChange}
                        placeholder="例: グルメ, 温泉, 美術館"
                        className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />
                </div>

                <div className="grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3 xl:grid-cols-1">
                    <button
                        onClick={onUpdate}
                        disabled={isUpdating || isDeleting}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        <FaFloppyDisk aria-hidden="true" />
                        {isUpdating ? '更新中...' : '更新'}
                    </button>
                    <button
                        onClick={onDelete}
                        disabled={isUpdating || isDeleting}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        <FaTrash aria-hidden="true" />
                        {isDeleting ? '削除中...' : '削除'}
                    </button>
                    <button
                        onClick={onCancel}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                    >
                        <FaArrowRotateLeft aria-hidden="true" />
                        戻る
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditPlanForm;
