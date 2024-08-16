'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlanItems, setSelectedPlanItems] = useState<PlanItem[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('/api/plan/get');
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlans();
    }, []);

    const handlePlanClick = async (plan: Plan) => {
        if (!plan.id) return;
        setSelectedPlan(plan);
        try {
            const response = await axios.get(`/api/plan/${plan.id}/items`);
            setSelectedPlanItems(response.data);
        } catch (error) {
            console.error('Error fetching plan items:', error);
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl p-3">Travel Plans</h1>
            <div className="p-6">
                <h2 className="text-2xl font-semibold">リスト</h2>
                <ul className="space-y-4 mt-4">
                    {plans.map(plan => (
                        <li key={plan.id} className="p-4">
                            <Link href={`/plan/${plan.id}`}>
                                <span>{plan.departure}</span> - <span>{plan.destination}</span> (
                                {new Date(plan.departureDate).toLocaleDateString()} -{' '}
                                {new Date(plan.arrivalDate).toLocaleDateString()})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
