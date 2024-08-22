export const createPrompt = (plan: any) => {
    var prompt = "つぎの条件で旅行プランを作成し、 JSONフォーマットのみでレスポンス\n[```json]などのマークダウンは除く\n\n"

    prompt += "{\n";
    for (var column in plan) {
        console.log("Column:", column);
        prompt += `    "${column}": "${plan[column]}",\n`
    }
    prompt += TemplateJson;
    prompt += "\n}";
    return prompt;
}

export const TemplateJson: string = `
    "planItems": [
        [
            {
                "date": "xxxx-xx-xxT00:00:00.000Z",
                "transportation": "",
                "place": "",
                "activity": "",
                "accommodation": "",
                "budget": xxxx,
                "memo": "",
            },
            {
                "date": "xxxx-xx-xxT00:00:00.000",
                "transportation": "",
                "place": "",
                "activity": "",
                "accommodation": "",
                "budget": xxxx,
                "memo": "",
            },
        ],
        [
            {
                "date": "xxxx-xx-xxT00:00:00.000",
                "transportation": "",
                "place": "",
                "activity": "",
                "accommodation": "",
                "budget": xxxx,
                "memo": "",
            },
            {
                "date": "xxxx-xx-xxT00:00:00.000",
                "transportation": "",
                "place": "",
                "activity": "",
                "accommodation": "",
                "budget": xxxx,
                "memo": "",
            },
        ],
    ]
`;