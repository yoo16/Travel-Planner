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
        console.log("planItem: ", planItem)

        try {
            if (planItem.budget !== undefined && planItem.budget !== null) {
                planItem.budget = parseInt(planItem.budget, 10);
            }
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
