import { NextRequest, NextResponse } from 'next/server';
import { TravelPlan } from '@/app/interfaces/TravelPlan';
import { CreateTravelPlan } from '@/app/services/TravelAIPlan';


export async function POST(req: NextRequest) {
    try {
        const travelPlan = await req.json() as TravelPlan;
        console.log(travelPlan);

        const json = CreateTravelPlan(travelPlan);
        return NextResponse.json(json);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}