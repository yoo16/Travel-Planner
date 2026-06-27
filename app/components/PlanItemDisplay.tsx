import React from 'react';
import { FaBed, FaLocationDot, FaPen, FaRoute, FaWallet } from 'react-icons/fa6';
import { formatBudget } from '@/app/services/Format';

interface PlanItemDisplayProps {
    plan: Plan;
    planItem: PlanItem;
    onEdit?: () => void;
}

const PlanItemDisplay: React.FC<PlanItemDisplayProps> = ({ planItem, onEdit }) => {
    const budgetLabel = formatBudget(planItem.budget);

    return (
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-bold text-emerald-700">{planItem.place || '場所未設定'}</p>
                    <h3 className="mt-2 text-xl font-black leading-snug text-slate-950">
                        {planItem.activity || 'アクティビティ未設定'}
                    </h3>
                </div>

                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:text-amber-700"
                    >
                        <FaPen aria-hidden="true" />
                        編集
                    </button>
                )}
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                {planItem.transportation && (
                    <div className="flex items-center gap-3 rounded-md bg-slate-50 px-4 py-3">
                        <FaRoute className="text-emerald-600" aria-hidden="true" />
                        <span>{planItem.transportation}</span>
                    </div>
                )}
                {planItem.accommodation && (
                    <div className="flex items-center gap-3 rounded-md bg-slate-50 px-4 py-3">
                        <FaBed className="text-emerald-600" aria-hidden="true" />
                        <span>{planItem.accommodation}</span>
                    </div>
                )}
                <div className="flex items-center gap-3 rounded-md bg-slate-50 px-4 py-3">
                    <FaWallet className="text-emerald-600" aria-hidden="true" />
                    <span>{budgetLabel}</span>
                </div>
                <div className="flex items-center gap-3 rounded-md bg-slate-50 px-4 py-3">
                    <FaLocationDot className="text-emerald-600" aria-hidden="true" />
                    <span>{planItem.place || '場所未設定'}</span>
                </div>
            </div>

            {planItem.memo && (
                <p className="mt-5 rounded-md border border-slate-100 bg-white px-4 py-3 text-sm leading-7 text-slate-600">
                    {planItem.memo}
                </p>
            )}
        </article>
    );
};

export default PlanItemDisplay;
