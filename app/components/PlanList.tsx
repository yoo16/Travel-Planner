import React from 'react';
import Link from 'next/link';
import {
    FaArrowRight,
    FaCalendarDays,
    FaMagnifyingGlass,
    FaMapLocationDot,
    FaPlus,
    FaWallet,
} from 'react-icons/fa6';
import { dateToString, stayDuration } from '@/app/services/Date';
import { formatBudget } from '@/app/services/Format';

interface PlanListProps {
    plans: Plan[];
    totalPlans: number;
    searchTerm: string;
}

const PlanList: React.FC<PlanListProps> = ({ plans, totalPlans, searchTerm }) => {
    return (
        <div className="space-y-8">
            <section className="rounded-lg border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-8 shadow-sm sm:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
                            <FaMapLocationDot aria-hidden="true" />
                            Travel plans
                        </div>
                        <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                            行きたい旅を見つけて、計画のヒントにする。
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                            保存済みの旅行プランを目的地やキーワードで探せます。気になるプランから詳細を確認して、
                            日程や予算の組み立て方を参考にできます。
                        </p>
                    </div>

                    <form action="/plan" className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur">
                        <label htmlFor="plan-search" className="text-sm font-bold text-slate-900">
                            プラン検索
                        </label>
                        <div className="mt-3 flex h-12 items-center gap-3 rounded-md border border-slate-300 bg-white px-4 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
                            <FaMagnifyingGlass className="shrink-0 text-slate-400" aria-hidden="true" />
                            <input
                                id="plan-search"
                                name="q"
                                type="search"
                                defaultValue={searchTerm}
                                placeholder="目的地、出発地、キーワード"
                                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                            />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                            <span className="font-semibold text-slate-600">
                                {plans.length} / {totalPlans}件
                            </span>
                            <div className="flex items-center gap-3">
                                {searchTerm && (
                                    <Link href="/plan" className="font-bold text-slate-500 hover:text-emerald-700">
                                        クリア
                                    </Link>
                                )}
                                <button type="submit" className="font-bold text-emerald-700 hover:text-emerald-800">
                                    検索
                                </button>
                                <Link href="/user/plan/create" className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-800">
                                    <FaPlus aria-hidden="true" />
                                    作成
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {plans.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <h2 className="text-xl font-black text-slate-950">条件に合うプランがありません</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        検索条件を変えるか、新しい旅行プランを作成してください。
                    </p>
                    <Link
                        href="/user/plan/create"
                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                        <FaPlus aria-hidden="true" />
                        新しいプランを作る
                    </Link>
                </div>
            )}

            {plans.length > 0 && (
                <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <Link
                            key={plan.id}
                            href={`/plan/${plan.id}`}
                            className="group flex min-h-[230px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                    {stayDuration(plan)}
                                </span>
                                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition group-hover:border-emerald-200 group-hover:text-emerald-700">
                                    <FaArrowRight aria-hidden="true" />
                                </span>
                            </div>

                            <div className="mt-5 flex-1">
                                <p className="text-sm font-bold text-slate-500">{plan.departure || '出発地未設定'} から</p>
                                <h2 className="mt-2 text-2xl font-black leading-snug text-slate-950">
                                    {plan.destination || '目的地未設定'}
                                </h2>
                                {plan.keywords && (
                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{plan.keywords}</p>
                                )}
                            </div>

                            <div className="mt-6 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                                <div className="flex items-center gap-3">
                                    <FaCalendarDays className="text-emerald-600" aria-hidden="true" />
                                    <span>
                                        {dateToString(plan.departureDate)} - {dateToString(plan.arrivalDate)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaWallet className="text-emerald-600" aria-hidden="true" />
                                    <span>{formatBudget(plan.budget)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            )}
        </div>
    );
};

export default PlanList;
