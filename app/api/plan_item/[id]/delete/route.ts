import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedItem = await prisma.planItem.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json({ success: true, deletedItem }, { status: 200 });
    } catch (error) {
        console.error('Error deleting plan item:', error);
        return NextResponse.json({ error: 'Failed to delete plan item' }, { status: 500 });
    }
}
