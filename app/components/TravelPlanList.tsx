import React from 'react';
import { TravelPlan } from '@/app/interfaces/TravelPlan';

interface TravelPlanProps {
    plan: TravelPlan;
}

const TravelPlanList: React.FC<TravelPlanProps> = ({ plan }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 my-4">
            <h2 className="text-2xl font-bold mb-4">Travel Plan</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Destination:</span> {plan.destination}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Departure Date:</span> {plan.departureDate}</p>
            <p className="text-lg"><span className="font-semibold">Arrival Date:</span> {plan.arrivalDate}</p>
        </div>
    );
};

export default TravelPlanList;
