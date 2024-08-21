import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const updatedPlan = await req.json();

    const { planItems, ...planData } = updatedPlan;

    try {
        const plan = await prisma.plan.update({
            where: { id: parseInt(id) },
            data: planData,
        });

        return NextResponse.json(plan);
    } catch (error) {
        console.log("Error updating plan:", error);
        return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
    }
}
