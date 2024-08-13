'use client'

import React, { useState, useRef } from 'react';
import PlanForm from '@/app/components/PlanForm';
import TravelPlanList from '@/app/components/TravelPlanList';
import { Plan } from '@/app/interfaces/Plan';
import axios from 'axios';

const Home: React.FC = () => {
    const [Plan, setPlan] = useState<Plan | null>(null);
    const [plans, setPlans] = useState<PlanItem[][]>();
    const [loading, setLoading] = useState(false);
    const planListRef = useRef<HTMLDivElement>(null);

    const handleFormSubmit = async (plan: Plan) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/plan/ai', plan);
            console.log("handleFormSubmit:", response.data.plans)
            setPlans(response.data.plans);
            // console.log(testPlan.plans)
            // await setPlans(testPlan.plans);
        } catch (error) {
            console.error('Error creating travel plan:', error);
        } finally {
            setLoading(false);
            if (planListRef.current) {
                planListRef.current.scrollIntoView({ behavior: 'smooth' });
            }
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
                {plans && <TravelPlanList plans={plans} />}
            </div>
        </div>
    );
};

export default Home;
