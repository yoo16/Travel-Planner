interface Plan {
    id?: number;
    departure: string;
    destination: string;
    departureDate: Date;
    arrivalDate: Date;
    budget?: number;
    keywords?: string;
    planItems?: PlanItem[][];
}