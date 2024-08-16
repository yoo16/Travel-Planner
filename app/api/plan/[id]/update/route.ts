import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const updatedPlan = await req.json();

    console.log("id:", id)
    console.log("updatedPlan:", updatedPlan)
    try {
        const plan = await prisma.plan.update({
            where: { id: parseInt(id) },
            data: updatedPlan,
        });

        return NextResponse.json(plan);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
    }
}