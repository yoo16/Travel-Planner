import { GoogleGenerativeAI } from "@google/generative-ai";
import { TravelPlan } from "@/app/interfaces/TravelPlan";
import { PlanTemplate } from "@/app/components/PlanTemplate";

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

const generationConfig = {
    temperature: 1,  //ランダム性
    topP: 0.95,      //累積確率
    topK: 64,        //トップkトークン
    maxOutputTokens: 1024,  //最大出力トークン数
    // responseMimeType: "application/json",
};

export async function CreateTravelPlan(travelPlan: TravelPlan) {
    if (!API_KEY) return;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    model.generationConfig.maxOutputTokens = 2048;

    const planTemplate = PlanTemplate;
    const prompt = `つぎの条件で旅行プランを作成\n
                    destination: ${travelPlan.destination}
                    departureDate: ${travelPlan.departureDate}
                    arrivalDate: ${travelPlan.arrivalDate}
                    budget: ${travelPlan.budget}
                    keyword: ${travelPlan.keyword}
                    \n
                    結果はJSONのみでレスポンス\n
                    ${planTemplate}
                    `;
    try {
        const result = await model.generateContent(prompt);
        console.log(result);
        return result;
    } catch (error) {
        return { message: null, error: 'Translate error.' };
    }
}