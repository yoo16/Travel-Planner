'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { stayDuration } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';

const PlanList = () => {
    const { setLoading } = useLoading();

    const [plans, setPlans] = useState<Plan[]>([]);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/plan/get');
            console.log(response.data)
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans()
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-gray-800">プラン</h1>
            <div>
                <ul className="mt-4">
                    {plans.map(plan => (
                        <li key={plan.id} className="py-2">

                            <Link href={`plan/${plan.id}/`}>
                                <span className="px-3 py-1 bg-green-500 text-xs text-white">{stayDuration(plan)}</span>
                                <span className="p-3">{plan.destination}</span>
                            </Link>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlanList;
