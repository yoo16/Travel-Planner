import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const planItem = await req.json();
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        console.log("ID: ", id)
        var updatePlanItem = await prisma.planItem.findUnique({
            where: { id: parseInt(id) },
        });


        console.log("PlanItem:", updatePlanItem)
        console.log("PlanItem:", planItem)
        try {
            var savedItem = await prisma.planItem.update({
                where: { id: parseInt(id) },
                data: planItem,
            });

            return NextResponse.json(savedItem);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Failed to save or update plan item' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}
