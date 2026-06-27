import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { FaArrowLeft, FaPenToSquare } from 'react-icons/fa6';
import PlanItemEditList from '@/app/components/PlanItemEditList';
import PlanSummary from '@/app/components/PlanSummary';
import { dateList, dateToString } from '@/app/services/Date';

const prisma = new PrismaClient();

interface UserPlanDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

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

const buildPlanItemsByTravelDate = (plan: Plan, items: PlanItem[]) => {
    const travelDates = dateList(plan.departureDate, plan.arrivalDate);

    return travelDates.map((date) =>
        items.filter((item) => dateToString(item.date) === date),
    );
};

export default async function UserPlanDetailPage({ params }: UserPlanDetailPageProps) {
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
    const normalizedPlan: Plan = {
        id: plan.id,
        departure: plan.departure,
        destination: plan.destination,
        departureDate: plan.departureDate,
        arrivalDate: plan.arrivalDate,
        budget: plan.budget ?? undefined,
        keywords: plan.keywords ?? undefined,
    };
    const planItems = buildPlanItemsByTravelDate(normalizedPlan, normalizedPlanItems);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href="/user/plan"
                    className="inline-flex h-10 items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"
                >
                    <FaArrowLeft aria-hidden="true" />
                    マイプランに戻る
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
            <PlanItemEditList plan={normalizedPlan} initialPlanItems={planItems} />
        </div>
    );
}
