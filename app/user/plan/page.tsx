import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import {
    FaArrowRight,
    FaCalendarDays,
    FaEye,
    FaPenToSquare,
    FaPlus,
    FaSuitcaseRolling,
    FaWallet,
} from 'react-icons/fa6';
import { dateToString, stayDuration } from '@/app/services/Date';
import { formatBudget } from '@/app/services/Format';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function MyPlanPage() {
    const plans = await prisma.plan.findMany({
        orderBy: [
            { updatedAt: 'desc' },
            { createdAt: 'desc' },
        ],
    });

    return (
        <div className="space-y-8">
            <section className="rounded-lg border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-8 shadow-sm sm:px-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
                            <FaSuitcaseRolling aria-hidden="true" />
                            My travel plans
                        </div>
                        <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                            作成した旅行プランを管理する。
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                            保存済みのプランを確認し、基本情報や日別の予定を編集できます。
                            AIで新しい旅程を作成することもできます。
                        </p>
                    </div>

                    <Link
                        href="/user/plan/create"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                    >
                        <FaPlus aria-hidden="true" />
                        AIプラン作成
                    </Link>
                </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Plan library</p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">マイプラン</h2>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {plans.length}件
                    </span>
                </div>

                {plans.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                        <h3 className="text-xl font-black text-slate-950">まだプランがありません</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            AIプラン作成から、最初の旅行計画を作成してください。
                        </p>
                        <Link
                            href="/user/plan/create"
                            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
                        >
                            <FaPlus aria-hidden="true" />
                            新しいプランを作る
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {plans.map((plan) => {
                            const normalizedPlan: Plan = {
                                id: plan.id,
                                departure: plan.departure,
                                destination: plan.destination,
                                departureDate: plan.departureDate,
                                arrivalDate: plan.arrivalDate,
                                budget: plan.budget ?? undefined,
                                keywords: plan.keywords ?? undefined,
                            };

                            return (
                                <article
                                    key={plan.id}
                                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                                >
                                    <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                                    {stayDuration(normalizedPlan)}
                                                </span>
                                                {plan.keywords && (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                                        {plan.keywords}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-4 text-sm font-bold text-slate-500">{plan.departure || '出発地未設定'} から</p>
                                            <h3 className="mt-1 text-2xl font-black text-slate-950">
                                                {plan.destination || '目的地未設定'}への旅
                                            </h3>

                                            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
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
                                        </div>

                                        <div className="grid gap-2 sm:grid-cols-3 lg:w-[330px]">
                                            <Link
                                                href={`/user/plan/${plan.id}`}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                                            >
                                                <FaArrowRight aria-hidden="true" />
                                                詳細
                                            </Link>
                                            <Link
                                                href={`/user/plan/${plan.id}/edit`}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700"
                                            >
                                                <FaPenToSquare aria-hidden="true" />
                                                編集
                                            </Link>
                                            <Link
                                                href={`/plan/${plan.id}`}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700"
                                            >
                                                <FaEye aria-hidden="true" />
                                                表示
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
