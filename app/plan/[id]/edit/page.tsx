'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import EditPlanForm from '@/app/components/EditPlanForm';
import { useParams, useRouter } from 'next/navigation';

const PlanEditPage: React.FC = () => {
    const { id } = useParams();
    const router = useRouter();

    const [plan, setPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPlan = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/plan/${id}`);
            setPlan(response.data);
        } catch (error) {
            console.error('Error fetching plan details:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    const onUpdate = () => {
        router.push('/');
    };

    const onCancel = () => {
        router.push('/');
    };

    return (
        <div>
            {loading && <Loading />}
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            {plan && (
                <EditPlanForm editingPlan={plan} />
            )}
        </div>
    );
};

export default PlanEditPage;
