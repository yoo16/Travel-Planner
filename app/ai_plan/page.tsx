'use client'

import React, { useState, useRef } from 'react';
import AiPlanForm from '@/app/components/AiPlanForm';
import AiPlanList from '@/app/components/AiPlanList';
import axios from 'axios';
import Loading from '../components/Loading';

const Home: React.FC = () => {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [planItems, setPlanItems] = useState<PlanItem[][]>();
    const [loading, setLoading] = useState(false);
    const planListRef = useRef<HTMLDivElement>(null);

    const handleFormSubmit = async (plan: Plan) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/ai/create', plan);
            const planItems = response.data.itemPlans;
            setPlanItems(planItems);
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
            const saveResponse = await axios.post('/api/ai/save',
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
        <div className="pb-20">
            {loading && <Loading />}
            <h1 className="text-center text-3xl p-3">AI Planner</h1>
            <AiPlanForm onSubmit={handleFormSubmit} />
            <div ref={planListRef}>
                {planItems && <AiPlanList planItems={planItems} />}
                {planItems && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4">
                        <div className="text-center">
                            <button
                                onClick={handleSavePlan}
                                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
