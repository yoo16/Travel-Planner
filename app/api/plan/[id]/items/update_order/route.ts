import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { planItems } = await req.json();

    try {
        for (var planItem of planItems) {
            // console.log("id:", planItem.id)
            // console.log("order:", planItem.order)
            await prisma.planItem.update({
                where: { id: planItem.id },
                data: { order: planItem.order },
            });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to reorder plan items' }, { status: 500 });
    }
}
