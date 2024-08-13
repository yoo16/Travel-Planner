import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { departure, destination, departureDate, arrivalDate, budget, keyword } = body;

        const plan = await prisma.plan.create({
            data: {
                departure,
                destination,
                departureDate: new Date(departureDate),
                arrivalDate: new Date(arrivalDate),
                budget,
                keyword,
            },
        });

        return NextResponse.json(plan, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}