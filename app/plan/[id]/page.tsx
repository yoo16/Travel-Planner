'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import PlanItemList from '@/app/components/PlanItemList';
import { dateToString } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';

const PlanDetailPage: React.FC = () => {
    const { setLoading } = useLoading();
    const { id } = useParams();

    const [plan, setPlan] = useState<Plan>();
    const [planItems, setPlanItems] = useState<PlanItem[][]>([]);

    const fetchPlan = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/plan/${id}`);
            setPlan(response.data);
            setPlanItems(response.data.planItems);
            console.log(response.data.planItems)
        } catch (error) {
            console.error('Error fetching plan details:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    if (!plan) return;

    return (
        <div className="m-6">
            <h1 className="text-center text-3xl py-3">Travel Planner</h1>
            <div>
                <Link href="/"
                    className="me-2 py-1 px-4 border border-blue-500 text-blue-500 rounded-md"
                >
                    Back
                </Link>
                <h2 className="text-2xl py-3">
                    <span>{plan.departure}</span>
                    <span className="m-2">-</span>
                    <span>{plan.destination}</span>
                </h2>
                <span className="py-1 px-2 me-3 rounded bg-green-500 text-white text-xs">
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

            <PlanItemList plan={plan} initialPlanItems={planItems} />
        </div>
    );
};

export default PlanDetailPage;
