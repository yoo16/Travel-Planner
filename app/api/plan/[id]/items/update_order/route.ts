import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { planItems } = await req.json();
        for (var planItem of planItems) {
            const result = await prisma.planItem.update({
                where: { id: planItem.id },
                data: { 
                    order: planItem.order,
                    date: planItem.date,
                },
            });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to reorder plan items' }, { status: 500 });
    }
}
