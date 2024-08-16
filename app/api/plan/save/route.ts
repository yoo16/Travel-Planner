import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const plan = await req.json();
    console.log("plan:", plan)
    try {
        const createdPlan = await prisma.plan.create({
            data: plan,
        });
        return NextResponse.json(createdPlan);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
    }
}