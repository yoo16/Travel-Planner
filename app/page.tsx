'use client'

import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import TravelPlanList from '@/app/components/TravelPlanList';
import { TravelPlan } from '@/app/interfaces/TravelPlan';
import axios from 'axios';

const Home: React.FC = () => {
    const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);

    const handleFormSubmit = async (plan: TravelPlan) => {
        try {
            const response = await axios.post('/api/plan', plan);
            setTravelPlan(response.data);
        } catch (error) {
            console.error('Error creating travel plan:', error);
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            <TravelForm onSubmit={handleFormSubmit} />
            {travelPlan && <TravelPlanList plan={travelPlan} />}
        </div>
    );
};

export default Home;
