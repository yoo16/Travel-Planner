'use client'

import React, { useState, useRef } from 'react';
import PlanForm from '@/app/components/PlanForm';
import TravelPlanList from '@/app/components/TravelPlanList';
import { Plan } from '@/app/interfaces/Plan';
import axios from 'axios';

const Home: React.FC = () => {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [savedPlan, setSavedPlan] = useState<Plan | null>(null);
    const [planItems, setPlanItems] = useState<PlanItem[][]>();
    const [loading, setLoading] = useState(false);
    const planListRef = useRef<HTMLDivElement>(null);

    const handleFormSubmit = async (plan: Plan) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/plan/ai', plan);
            const generatedPlans = response.data.plans;
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

    const handleSavePlans = async () => {
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
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            <PlanForm onSubmit={handleFormSubmit} />
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                        Loading...
                    </div>
                </div>
            )}
            <div ref={planListRef}>
                {planItems && <TravelPlanList planItems={planItems} />}
            </div>
            {planItems && (
                <div className="text-center mt-4">
                    <button
                        onClick={handleSavePlans}
                        className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Save Plan
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
