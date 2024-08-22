import React from 'react';
import { useLoading } from '../context/LoadingContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AiPlanListProps {
    plan: Plan;
    planItems: PlanItem[][];
    onSave: () => void;
}

const AiPlanList: React.FC<AiPlanListProps> = ({ plan, planItems, onSave }) => {
    const { setLoading } = useLoading();

    const handleSave = async () => {
        if (!plan || !planItems) return;
        try {
            setLoading(true);
            const saveResponse = await axios.post('/api/ai/save',
                {
                    plan: plan,
                    planItems: planItems.flat(),
                }
            );
            if (saveResponse) {
                onSave();
            }
        } catch (error) {
            console.error('Error saving travel plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                                        アクティビティ
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
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4">
                <div className="text-center">
                    <button
                        onClick={handleSave}
                        className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default AiPlanList;
