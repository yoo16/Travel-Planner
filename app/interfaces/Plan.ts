interface Plan {
    id: number;
    departure: string;
    destination: string;
    departureDate: string;
    arrivalDate: string;
    budget?: number;
    keyword?: string;
}