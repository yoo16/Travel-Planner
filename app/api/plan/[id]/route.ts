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

        return NextResponse.json(plan);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch plan items' }, { status: 500 });
    }
}
