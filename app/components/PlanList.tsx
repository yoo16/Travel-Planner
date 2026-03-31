'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { stayDuration } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';

const PlanList = () => {
    const { setLoading } = useLoading();
    const [plans, setPlans] = useState<Plan[]>([]);

    // プラン一覧を取得する関数
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/plan/get');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPlans(data);
        } catch (err) {
            console.error('Error fetching plans:', err);
        } finally {
            setLoading(false);
        }
    };

    // プラン一覧を取得するための useEffect
    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">プランを探す</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <Link
                        key={plan.id}
                        href={`/plan/${plan.id}`}
                        className="block rounded-xl border border-gray-200 bg-white shadow-sm
                       hover:shadow-md hover:ring-2 hover:ring-green-400/30
                       transition"
                    >
                        <div className="p-4 space-y-3">
                            {/* 宿泊日数バッジ */}
                            <span className="inline-block rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                                {stayDuration(plan)}
                            </span>

                            {/* 行き先（プラン名など） */}
                            <p className="text-lg font-medium text-gray-900">{plan.destination}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PlanList;
