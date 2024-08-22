'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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
            const response = await axios.get(`/api/plan/${id}`);
            setPlan(response.data);
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
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            {plan && (
                <EditPlanForm editingPlan={plan} />
            )}
        </div>
    );
};

export default PlanEditPage;
