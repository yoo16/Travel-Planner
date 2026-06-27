import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { FaArrowLeft, FaPenToSquare } from 'react-icons/fa6';
import PlanItemList from '@/app/components/PlanItemList';
import PlanSummary from '@/app/components/PlanSummary';

const prisma = new PrismaClient();

interface PlanDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

const groupPlanItemsByDate = (items: PlanItem[]) => {
    const groupedItems = items.reduce((groups: Record<string, PlanItem[]>, item) => {
        const dateKey = new Date(item.date).toISOString().split('T')[0];

        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }

        groups[dateKey].push(item);
        return groups;
    }, {});

    return Object.keys(groupedItems).sort().map((date) => groupedItems[date]);
};

const normalizePlanItem = (item: {
    id: number;
    date: Date;
    transportation: string | null;
    place: string | null;
    activity: string | null;
    memo: string | null;
    accommodation: string | null;
    budget: number | null;
    planId: number;
    order: number | null;
}): PlanItem => ({
    id: item.id,
    date: item.date,
    transportation: item.transportation ?? '',
    place: item.place ?? '',
    activity: item.activity ?? '',
    memo: item.memo ?? '',
    accommodation: item.accommodation ?? '',
    budget: item.budget ?? undefined,
    planId: item.planId,
    order: item.order ?? undefined,
});

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
    const { id } = await params;
    const planId = Number(id);

    if (!Number.isInteger(planId)) {
        notFound();
    }

    const plan = await prisma.plan.findFirst({
        where: { id: planId },
        include: {
            planItems: {
                orderBy: [
                    { date: 'asc' },
                    { order: 'asc' },
                ],
            },
        },
    });

    if (!plan) {
        notFound();
    }

    const normalizedPlanItems = plan.planItems.map(normalizePlanItem);
    const planItems = groupPlanItemsByDate(normalizedPlanItems);
    const normalizedPlan: Plan = {
        id: plan.id,
        departure: plan.departure,
        destination: plan.destination,
        departureDate: plan.departureDate,
        arrivalDate: plan.arrivalDate,
        budget: plan.budget ?? undefined,
        keywords: plan.keywords ?? undefined,
        planItems,
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href="/plan"
                    className="inline-flex h-10 items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"
                >
                    <FaArrowLeft aria-hidden="true" />
                    プラン一覧に戻る
                </Link>

                <Link
                    href={`/user/plan/${normalizedPlan.id}/edit`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                    <FaPenToSquare aria-hidden="true" />
                    このプランを編集
                </Link>
            </div>

            <PlanSummary plan={normalizedPlan} />

            <section>
                <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Itinerary</p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">旅程</h2>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {normalizedPlanItems.length}件
                    </span>
                </div>
                <PlanItemList plan={normalizedPlan} initialPlanItems={planItems} />
            </section>
        </div>
    );
}
