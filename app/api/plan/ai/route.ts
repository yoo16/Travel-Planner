import { NextRequest, NextResponse } from 'next/server';
import { CreatePlan } from '@/app/services/AIPlan';


export async function POST(req: NextRequest) {
    try {
        const plan = await req.json() as Plan;
        const json = await CreatePlan(plan);
        console.log(json);
        return NextResponse.json(json);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}