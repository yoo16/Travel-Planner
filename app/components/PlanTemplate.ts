export const createPrompt = (plan: Plan) => {
    var prompt = "つぎの条件で旅行プランを作成、 マークダウンを除いたJSONフォーマットのみでレスポンスして\n"
    for (var column in plan) {
        prompt += `${column}`
    }
    // destination: ${plan.destination}
    // departureDate: ${plan.departureDate}
    // arrivalDate: ${plan.arrivalDate}
    // budget: ${plan.budget}
    // keyword: ${plan.keyword}

    prompt += TemplateJson;
    return prompt;
}

export const TemplateJson: string = `
    "destination": "xxxx",
    "departureDate": "xxxx-xx-xx",
    "arrivalDate": "xxxx-xx-xx",
    "plans": [
        [
            {
                "date": "xxxx-xx-xx",
                "transportation": "",
                "place": "",
                "activity": "",
                "memo": "",
            },
            {
                "date": "xxxx-xx-xx",
                "transportation": "",
                "place": "",
                "activity": "",
                "memo": "",
            },
        ],
        [
            {
                "date": "xxxx-xx-xx",
                "transportation": "",
                "place": "",
                "activity": "",
                "memo": "",
            },
            {
                "date": "xxxx-xx-xx",
                "transportation": "",
                "place": "",
                "activity": "",
                "memo": "",
            },
        ],
    ]
}
`;