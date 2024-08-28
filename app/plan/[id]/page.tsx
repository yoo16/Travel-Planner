'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import PlanItemList from '@/app/components/PlanItemList';
import { dateToString } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';
import PlanSummary from '@/app/components/PlanSummary';
import PlanItemModal from '@/app/components/PlanItemModal';

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
        } catch (error) {
            console.error('Error fetching plan details:', error);
        } finally {
            setLoading(false);
        }
    }, [id, setLoading]);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    if (!plan) return;

    return (
        <div className="container mx-auto p-4">
            <PlanSummary plan={plan} />
            <Link
                href={`/plan/${plan.id}/edit`}
                className="py-1 px-4 bg-yellow-500 text-white rounded-md"
            >
                編集
            </Link>

            <PlanItemList plan={plan} initialPlanItems={planItems} />
        </div>
    );
};

export default PlanDetailPage;
