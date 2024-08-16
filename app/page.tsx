'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import { dateToString } from './services/Date';
import EditPlan from './components/EditPlan';

const Home: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
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
        fetchPlans();
    }, []);

    const onEdit = (plan: Plan) => {
        setEditingPlan(plan);
        setIsFormVisible(true)
    };

    const handleCancelEdit = () => {
        setEditingPlan(null);
        setIsFormVisible(false)
    };

    return (
        <div>
            {loading && <Loading />}
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            <div className="p-6">
                <ul className="space-y-4 mt-4">
                    {plans.map(plan => (
                        <li key={plan.id} className="p-4">

                            {editingPlan && editingPlan.id === plan.id ? (
                                <EditPlan
                                    editingPlan={editingPlan}
                                    onSubmit={() => handleCancelEdit()}
                                    onClose={() => handleCancelEdit()}
                                />
                            ) : (
                                <div className="flex">
                                    <div>
                                        <button
                                            onClick={() => onEdit(plan)}
                                            className="mx-3 py-1 px-4 bg-yellow-500 text-white rounded-md"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div>
                                        <Link href={`/plan/${plan.id}`}>
                                            <span>{plan.departure}</span>
                                            -
                                            <span>{plan.destination}</span>
                                            (
                                            {dateToString(plan.departureDate)}
                                            -
                                            {dateToString(plan.arrivalDate)}
                                            )
                                        </Link>
                                    </div>
                                </div>

                            )}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
