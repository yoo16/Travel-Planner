import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const planItem = await req.json();
        const { id } = params;

        console.log(planItem);

        try {
            const savedItem = await prisma.planItem.update({
                where: { id: parseInt(id) },
                data: {
                    date: planItem.date,
                    transportation: planItem.transportation,
                    place: planItem.place,
                    activity: planItem.activity,
                    memo: planItem.memo,
                    planId: planItem.planId,
                },
            });
            return NextResponse.json(savedItem);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}
