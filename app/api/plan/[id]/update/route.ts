import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const updatedPlan = await req.json();

    try {
        const plan = await prisma.plan.update({
            where: { id: parseInt(id) },
            data: {
                departure: updatedPlan.departure,
                destination: updatedPlan.destination,
                departureDate: new Date(updatedPlan.departureDate),
                arrivalDate: new Date(updatedPlan.arrivalDate),
                budget: updatedPlan.budget === null || typeof updatedPlan.budget === 'undefined'
                    ? null
                    : Number(updatedPlan.budget),
                keywords: updatedPlan.keywords ?? '',
            },
        });

        return NextResponse.json(plan);
    } catch (error) {
        console.log("Error updating plan:", error);
        return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
    }
}
