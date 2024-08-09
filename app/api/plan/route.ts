import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content, TextPart, InlineDataPart, HarmCategory, HarmBlockThreshold, StartChatParams } from '@google/generative-ai';
import { TravelPlan } from '@/app/interfaces/TravelPlan';
import { CreateTravelPlan } from '@/app/services/TravelAIPlan';



const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

export async function POST(req: NextRequest) {
    try {
        const travelPlan = await req.json() as TravelPlan;
        console.log(travelPlan);

        const data = CreateTravelPlan(travelPlan);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }
}