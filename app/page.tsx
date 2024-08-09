'use client'

import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import TravelPlanList from '@/app/components/TravelPlanList';
import { TravelPlan } from '@/app/interfaces/TravelPlan';
import axios from 'axios';
import testPlan from '@/app/data/test_plan.json';

const Home: React.FC = () => {
    const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
    const [plans, setPlans] = useState<PlanItem[][]>();

    const handleFormSubmit = async (plan: TravelPlan) => {
        try {
            // const response = await axios.post('/api/plan', plan);
            // setTravelPlan(response.data);
            console.log(testPlan.plans)
            setPlans(testPlan.plans);
        } catch (error) {
            console.error('Error creating travel plan:', error);
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            <TravelForm onSubmit={handleFormSubmit} />
            {plans && <TravelPlanList plans={plans} />}
        </div>
    );
};

export default Home;
