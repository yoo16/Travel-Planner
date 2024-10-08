'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { dateToString } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';
import { TestUser } from '@/app/data/TestUser';

const Home: React.FC = () => {
    // TODO: user auth provider
    const user = TestUser;

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
            <div className="p-6">
                <Link
                    href="/user/plan/create"
                    className="me-2 py-2 px-4 bg-green-500 text-white rounded-md"
                >
                    AIプラン作成
                </Link>

                <ul className="mt-4">
                    {plans.map(plan => (
                        <li key={plan.id} className="py-2">

                            <div className="flex">
                                <div>
                                    <Link href={`/user/plan/${plan.id}`}
                                        className="me-2 py-1 px-4 text-blue-500 border border-blue-500 rounded-md"
                                    >
                                        編集
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