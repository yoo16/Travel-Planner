export const filterPlan = (rawPlan: any): Plan => {
    return {
        departure: rawPlan.departure,
        destination: rawPlan.destination,
        departureDate: new Date(rawPlan.departureDate),
        arrivalDate: new Date(rawPlan.arrivalDate),
        budget: rawPlan.budget ? parseInt(rawPlan.budget, 10) : 0,
        keywords: rawPlan.keywords,
    };
}