import { NextRequest, NextResponse } from 'next/server';
import { CreatePlan } from '@/app/services/AIPlan';

export async function POST(req: NextRequest) {
    try {
        const plan = await req.json();
        const aiPlan = await CreatePlan(plan);
        console.log(aiPlan);
        if (!aiPlan) return NextResponse.json({ error: 'Cannot create plan' });
        return NextResponse.json(aiPlan);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}