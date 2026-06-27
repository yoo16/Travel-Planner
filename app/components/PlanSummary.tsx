import React from 'react';
import { FaCalendarDays, FaLocationDot, FaWallet } from 'react-icons/fa6';
import { dateToString, stayDuration } from '@/app/services/Date';
import { formatBudget } from '@/app/services/Format';

interface PlanSummaryProps {
    plan: Plan;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({ plan }) => {
    const budgetLabel = formatBudget(plan.budget);

    return (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <div className="mb-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        {stayDuration(plan)}
                    </div>
                    <p className="text-sm font-bold text-slate-500">{plan.departure || '出発地未設定'} から</p>
                    <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                        {plan.destination || '目的地未設定'}への旅
                    </h1>
                    {plan.keywords && (
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{plan.keywords}</p>
                    )}
                </div>
            </div>

            <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
                <div className="rounded-md bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                        <FaLocationDot className="text-emerald-600" aria-hidden="true" />
                        Route
                    </div>
                    <p className="mt-2 text-sm font-bold text-slate-950">
                        {plan.departure || '未設定'} - {plan.destination || '未設定'}
                    </p>
                </div>
                <div className="rounded-md bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                        <FaCalendarDays className="text-emerald-600" aria-hidden="true" />
                        Dates
                    </div>
                    <p className="mt-2 text-sm font-bold text-slate-950">
                        {dateToString(plan.departureDate)} - {dateToString(plan.arrivalDate)}
                    </p>
                </div>
                <div className="rounded-md bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                        <FaWallet className="text-emerald-600" aria-hidden="true" />
                        Budget
                    </div>
                    <p className="mt-2 text-sm font-bold text-slate-950">{budgetLabel}</p>
                </div>
            </div>
        </section>
    );
};

export default PlanSummary;
