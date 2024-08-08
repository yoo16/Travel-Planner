import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content, TextPart, InlineDataPart, HarmCategory, HarmBlockThreshold, StartChatParams } from '@google/generative-ai';
import { TravelPlan } from '@/app/interfaces/TravelPlan';

var history: Content[] = [];

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

const generationConfig = {
    temperature: 1,  //ランダム性
    topP: 0.95,      //累積確率
    topK: 64,        //トップkトークン
    maxOutputTokens: 1024,  //最大出力トークン数
    // responseMimeType: "application/json",
};

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
    if (!API_KEY) return;
    if (!GEMINI_MODEL) return;

    const travelPlan = await req.json() as TravelPlan;

    // ここでGeminiAPIを使って旅行プランを生成します
    // GeminiAPIに関する具体的な実装は、APIの詳細を確認してください

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel(
            {
                model: GEMINI_MODEL,
            });

        const config: StartChatParams = {
            history: history,
            generationConfig: generationConfig,
            safetySettings: safetySettings,
        }

        const chat = model.startChat(config);
        const result = await chat.sendMessage(prompt);
        const content = result.response.text().replaceAll('*', '\n');

        const data = {

        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' });
    }

    return NextResponse.json(travelPlan, { status: 200 });
}

export const config = {
    runtime: 'experimental-edge', // オプション: Edge Runtimeを使用する場合
};
