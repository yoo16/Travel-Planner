import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const plan = await prisma.plan.findFirst({
            where: { id: parseInt(id) },
            include: {
                planItems: true,
            },
        });

        if (!plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }

        // planItems を日付ごとにグループ化
        const groupedItems = plan.planItems.reduce((groups: Record<string, any[]>, item) => {
            const dateKey = item.date.toISOString().split('T')[0];
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(item);
            return groups;
        }, {});

        const planItems = Object.keys(groupedItems).sort().map(date => groupedItems[date]);

        const structuredPlan = {
            ...plan,
            planItems,
        };

        return NextResponse.json(structuredPlan);
    } catch (error) {
        console.error('Error fetching plan items:', error);
        return NextResponse.json({ error: 'Failed to fetch plan items' }, { status: 500 });
    }
}
