import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.plan.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Plan deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting plan:', error);
        return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
    }
}
