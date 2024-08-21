import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const plans = await prisma.plan.findMany({
            orderBy: [
                { updatedAt: 'desc' },
                { createdAt: 'desc' },
            ]
        });
        return NextResponse.json(plans, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
    }
}
