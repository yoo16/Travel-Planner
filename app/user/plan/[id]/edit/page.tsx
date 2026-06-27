import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { FaArrowLeft, FaEye } from 'react-icons/fa6';
import EditPlanForm from '@/app/components/EditPlanForm';
import PlanItemEditList from '@/app/components/PlanItemEditList';
import { dateList, dateToString } from '@/app/services/Date';

const prisma = new PrismaClient();

interface PlanEditPageProps {
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

export default async function PlanEditPage({ params }: PlanEditPageProps) {
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
        keywords: plan.keywords ?? '',
    };
    const planItems = buildPlanItemsByTravelDate(normalizedPlan, normalizedPlanItems);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href={`/user/plan/${normalizedPlan.id}`}
                    className="inline-flex h-10 items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-700"
                >
                    <FaArrowLeft aria-hidden="true" />
                    マイプラン詳細に戻る
                </Link>

                <Link
                    href={`/plan/${normalizedPlan.id}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700"
                >
                    <FaEye aria-hidden="true" />
                    公開表示を確認
                </Link>
            </div>

            <section className="rounded-lg border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-5 py-8 shadow-sm sm:px-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Edit travel plan</p>
                <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                    {normalizedPlan.destination}への旅を編集
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                    基本情報を更新し、日別の予定を追加・並び替えできます。変更した行程はドラッグして日付を移動できます。
                </p>
            </section>

            <div className="grid gap-8 xl:grid-cols-[420px_1fr] xl:items-start">
                <div className="xl:sticky xl:top-24">
                    <EditPlanForm editingPlan={normalizedPlan} />
                </div>

                <PlanItemEditList plan={normalizedPlan} initialPlanItems={planItems} />
            </div>
        </div>
    );
}
