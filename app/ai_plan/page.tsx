'use client'

import React, { useState, useRef } from 'react';
import PlanForm from '@/app/components/AiPlanForm';
import AiPlanList from '@/app/components/AiPlanList';
import axios from 'axios';

const Home: React.FC = () => {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [planItems, setPlanItems] = useState<PlanItem[][]>();
    const [loading, setLoading] = useState(false);
    const planListRef = useRef<HTMLDivElement>(null);

    const handleFormSubmit = async (plan: Plan) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/plan/ai', plan);
            const generatedPlans = response.data.itemPlans;
            console.log("handleFormSubmit:", generatedPlans);
            setPlanItems(generatedPlans);
            setPlan(plan);
        } catch (error) {
            console.error('Error creating travel plan:', error);
        } finally {
            setLoading(false);
            if (planListRef.current) {
                planListRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleSavePlan = async () => {
        if (!plan || !planItems) return;

        try {
            setLoading(true);
            const saveResponse = await axios.post('/api/plan/save',
                {
                    plan: plan,
                    planItems: planItems.flat(),
                }
            );
            console.log('Plan saved successfully:', saveResponse.data);
        } catch (error) {
            console.error('Error saving travel plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl p-3">AI Planner</h1>
            <PlanForm onSubmit={handleFormSubmit} />
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                        Loading...
                    </div>
                </div>
            )}
            <div ref={planListRef}>
                {planItems && <AiPlanList planItems={planItems} />}
                {planItems && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleSavePlan}
                            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
