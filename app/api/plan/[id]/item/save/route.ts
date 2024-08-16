import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const planItem = await req.json();
        console.log(planItem)
        try {
            const savedItem = await prisma.planItem.create({
                data: planItem,
            });
            return NextResponse.json(savedItem);
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
}
