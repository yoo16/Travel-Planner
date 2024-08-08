import { GoogleGenerativeAI } from "@google/generative-ai";
import { TravelPlan } from "@/app/interfaces/TravelPlan";
import { PlanTemplate } from "@/app/components/PlanTemplate";

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

if (!API_KEY) {
    throw new Error("API key is not set");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
model.generationConfig.maxOutputTokens = 2048;

export async function TravelAIPlan(travelPlan: TravelPlan, toLang: string) {
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