'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import { dateToString } from './services/Date';
import { useLoading } from '@/app/context/LoadingContext';

const Home: React.FC = () => {
    const { setLoading } = useLoading();

    const [plans, setPlans] = useState<Plan[]>([]);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/plan/get');
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


    const onUpdate = (updatedPlan: Plan) => {
        setPlans(prevPlans =>
            prevPlans.map(plan => (plan.id === updatedPlan.id ? updatedPlan : plan))
        );
        setEditingPlan(null);
        setIsEditFormVisible(false);
    };

    const onCancelEdit = () => {
        setEditingPlan(null);
        setIsEditFormVisible(false)
    };

    return (
        <div>
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>

            <div className="p-6">
                <Link
                    href="/plan/create"
                    className="me-2 py-1 px-4 bg-yellow-500 text-white rounded-md"
                >
                    New
                </Link>

                <ul className="mt-4">
                    {plans.map(plan => (
                        <li key={plan.id} className="py-2">

                            <div className="flex">
                                <div>
                                    <Link
                                        href={`plan/${plan.id}/edit`}
                                        className="me-2 py-1 px-4 bg-yellow-500 text-white rounded-md"
                                    >
                                        Edit
                                    </Link>
                                </div>
                                <div>
                                    <Link href={`/plan/${plan.id}`}
                                        className="me-2 py-1 px-4 bg-blue-500 text-white rounded-md"
                                    >
                                        Plan
                                    </Link>

                                    <span className="py-1 px-2 mx-3 rounded bg-green-500 text-white text-xs">
                                        場所
                                    </span>
                                    <span>{plan.departure}</span>
                                    <span className="m-2">-</span>
                                    <span>{plan.destination}</span>

                                    <span className="py-1 px-2 mx-3 rounded bg-green-500 text-white text-xs">
                                        日程
                                    </span>
                                    {dateToString(plan.departureDate)}
                                    <span className="m-2">-</span>
                                    {dateToString(plan.arrivalDate)}

                                    <span className="py-1 px-2 mx-3 rounded bg-green-500 text-white text-xs">
                                        予算
                                    </span>
                                    {plan.budget?.toLocaleString()}円
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
