import { PrismaClient } from '@prisma/client';
import PlanList from '@/app/components/PlanList';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

interface PlanPageProps {
    searchParams: Promise<{
        q?: string;
    }>;
}

export default async function PlanPage({ searchParams }: PlanPageProps) {
    const { q } = await searchParams;
    const searchTerm = q?.trim() ?? '';
    const where = searchTerm
        ? {
            OR: [
                { departure: { contains: searchTerm } },
                { destination: { contains: searchTerm } },
                { keywords: { contains: searchTerm } },
            ],
        }
        : undefined;

    const totalPlans = await prisma.plan.count();
    const plans = await prisma.plan.findMany({
        where,
        orderBy: [
            { updatedAt: 'desc' },
            { createdAt: 'desc' },
        ],
    });

    const normalizedPlans: Plan[] = plans.map((plan) => ({
        id: plan.id,
        departure: plan.departure,
        destination: plan.destination,
        departureDate: plan.departureDate,
        arrivalDate: plan.arrivalDate,
        budget: plan.budget ?? undefined,
        keywords: plan.keywords ?? undefined,
    }));

    return <PlanList plans={normalizedPlans} totalPlans={totalPlans} searchTerm={searchTerm} />;
}
