import React from 'react';

interface TravelPlanListProps {
    plans: PlanItem[][];
}

const TravelPlanList: React.FC<TravelPlanListProps> = ({ plans }) => {
    return (
        <div className="m-3">
            {plans.map((dayPlans, dayIndex) => (
                <div key={dayIndex} className="border-b pb-6">
                    <h2 className="text-2xl font-bold text-gray-600 mb-6">
                        Day {dayIndex + 1}: {dayPlans[0].date}
                    </h2>
                    <div className="space-y-4">
                        {dayPlans.map((plan, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold text-gray-500">場所: </span>
                                    {plan.place}
                                </p>
                                {plan.transportation && (
                                    <p className="text-gray-700 mb-2">
                                        <span className="font-semibold text-gray-500">移動: </span>
                                        {plan.transportation}
                                    </p>
                                )}
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold text-gray-500">行動: </span>
                                    {plan.activity}
                                </p>
                                <p className="text-gray-700">
                                    {plan.memo}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TravelPlanList;
