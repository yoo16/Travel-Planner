import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";
import { createPrompt } from "@/app/components/PlanTemplate";
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

const generationConfig:GenerationConfig = {
    temperature: 1,  //ランダム性
    topP: 0.95,      //累積確率
    topK: 64,        //トップkトークン
    maxOutputTokens: 2048,  //最大出力トークン数
    responseMimeType: "application/json",
};

export async function getTestPlan() {
    const filePath = path.resolve(process.cwd(), 'app/data/test_plan.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContents);
    return json;
}

export async function CreatePlan(plan: Plan) {
    if (!API_KEY) return;
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        model.generationConfig = generationConfig;

        const prompt = createPrompt(plan);
        console.log(prompt)

        const result = await model.generateContent(prompt);
        console.log(result)
        var json = JSON.parse(result.response.text());
        console.log(json)

        // Test JSON;
        // var json = await getTestPlan();
        return json;
    } catch (error) {
        return { error: 'Gemini request error.' };
    }
}