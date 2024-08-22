'use client'

import React, { useState, useRef } from 'react';
import AiPlanForm from '@/app/components/AiPlanForm';
import AiPlanList from '@/app/components/AiPlanList';
import axios from 'axios';
import { useLoading } from '@/app/context/LoadingContext';
import { useRouter } from 'next/navigation';

const PlanCreatePage: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useLoading();
    const planListRef = useRef<HTMLDivElement>(null);

    const [plan, setPlan] = useState<Plan>();
    const [planItems, setPlanItems] = useState<PlanItem[][]>();

    const onAiCreate = async (plan: Plan) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/ai/create', plan);
            const planItems = response.data.itemPlans;
            setPlanItems(planItems);
            setPlan(plan);
        } catch (error) {
            console.error('Error creating travel plan:', error);
        } finally {
            setLoading(false);
            if (planListRef.current) {
                planListRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const onCancel = () => {
        router.push('/');
    }

    const onSave = async () => {
        router.push('/');
    };

    return (
        <div className="pb-20">
            <h1 className="text-center text-3xl p-3">AI Planner</h1>
            <AiPlanForm
                onAiCreate={onAiCreate}
                onCancel={onCancel}
            />
            <div ref={planListRef}>
                {plan && planItems &&
                    <AiPlanList
                        plan={plan}
                        planItems={planItems}
                        onSave={onSave}
                    />
                }
            </div>
        </div>
    );
};

export default PlanCreatePage;
