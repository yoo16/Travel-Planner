'use client';

import React, { useState, useEffect, useCallback } from 'react';
import EditPlanForm from '@/app/components/EditPlanForm';
import { useParams, useRouter } from 'next/navigation';
import { useLoading } from '@/app/context/LoadingContext';

const PlanEditPage: React.FC = () => {
    const { setLoading } = useLoading();
    const { id } = useParams();
    const router = useRouter();

    const [plan, setPlan] = useState<Plan>();

    const fetchPlan = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/plan/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPlan(data);
            }
        } catch (error) {
            console.error('Error fetching plan details:', error);
        } finally {
            setLoading(false);
        }
    }, [id, setLoading]);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    return (
        <div>
            {plan && (
                <EditPlanForm editingPlan={plan} />
            )}
        </div>
    );
};

export default PlanEditPage;
