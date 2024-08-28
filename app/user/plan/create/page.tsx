'use client'

import React, { useState, useRef } from 'react';
import AiPlanForm from '@/app/components/AiPlanForm';
import AiPlanList from '@/app/components/AiPlanList';
import { useLoading } from '@/app/context/LoadingContext';
import { useRouter } from 'next/navigation';

const PlanCreatePage: React.FC = () => {
    const router = useRouter();
    const { setLoading } = useLoading();
    const planListRef = useRef<HTMLDivElement>(null);

    const [plan, setPlan] = useState<Plan>();
    const [planItems, setPlanItems] = useState<PlanItem[][]>();

    const onAiCreate = async (plan: Plan, planItems: PlanItem[][]) => {
        try {
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

    const handleClose = () => {
        router.push('/user/plan');
    }

    const onSave = async () => {
        handleClose();
    };

    return (
        <div className="pb-20">
            <AiPlanForm
                onAiCreate={onAiCreate}
                onClose={handleClose}
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
