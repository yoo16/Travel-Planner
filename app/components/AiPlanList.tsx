import React from 'react';

interface AiPlanListProps {
    planItems: PlanItem[][];
}

const AiPlanList: React.FC<AiPlanListProps> = ({ planItems }) => {
    return (
        <div className="m-5">
            {planItems.map((dayPlans, dayIndex) => (
                <div key={dayIndex} className="border-b p-6">
                    <h2 className="text-2xl font-bold text-gray-600 mb-6">
                        {new Date(dayPlans[0].date).toLocaleDateString()} - {dayIndex + 1}日目 -
                    </h2>
                    <div className="space-y-4">
                        {dayPlans.map((plan, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                                <div className="text-gray-700 my-4">
                                    <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                                        行動
                                    </span>
                                    {plan.activity}
                                </div>

                                <div className="text-gray-700 my-4">
                                    <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                                        場所
                                    </span>
                                    {plan.place}
                                    {plan.transportation && (
                                        <>
                                            <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                                                交通
                                            </span>
                                            {plan.transportation}
                                        </>
                                    )}
                                </div>

                                <div className="text-gray-700 mx-2">
                                    {plan.memo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AiPlanList;
