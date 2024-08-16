import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const planItems = await prisma.planItem.findMany({
            where: { planId: parseInt(id) },
            orderBy: { date: 'asc' },
        });

        return NextResponse.json(planItems, { status: 200 });
    } catch (error) {
        console.error('Error fetching plan items:', error);
        return NextResponse.json({ error: 'Failed to fetch plan items' }, { status: 500 });
    }
}
