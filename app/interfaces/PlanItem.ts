interface PlanItem {
    id?: number;
    date: Date;
    transportation: string;
    place: string;
    activity: string;
    memo: string;
    accommodation?: string;
    budget?: number;
    planId: number;
    order?: number;
}