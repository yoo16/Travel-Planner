import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { plan, planItems } = await req.json();

        console.log("Plan: ", plan);
        console.log("Plan Items:", planItems);

        // plan.departureDate = new Date(plan.departureDate)
        // plan.arrivalDate = new Date(plan.arrivalDate)

        // const savedPlan = await prisma.plan.create({
        //     data: plan,
        // });

        // return NextResponse.json({ success: true, planId: savedPlan.id });
        return NextResponse.json({ success: true, planId: 1 });
    } catch (error) {
        console.error('Error saving plan:', error);
        return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
    }
}
