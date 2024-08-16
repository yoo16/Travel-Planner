'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PlanItemForm from '@/app/components/PlanItemForm';
import Link from 'next/link';
import PlanItemList from '@/app/components/PlanItemList';
import Loading from '@/app/components/Loading';

const PlanDetailPage: React.FC = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<Plan>();
    const [planItems, setPlanItems] = useState<PlanItem[][]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

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
    }, [id]);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    const handleAddPlanItem = async () => {
        fetchPlan();
        setIsFormVisible(false);
    };

    const handleUpdatePlanItem = () => {
        fetchPlan();
        setIsFormVisible(false);
    };

    const handleShowForm = () => {
        setIsFormVisible(true);
    };

    const handleHideForm = () => {
        setIsFormVisible(false);
    }

    return (
        <div>
            {loading && <Loading />}
            {plan &&
                <div>
                    <h1 className="text-3xl p-3">
                        {plan.departure} - {plan.destination}
                        (
                        {new Date(plan.departureDate).toLocaleDateString()}
                        -
                        {new Date(plan.arrivalDate).toLocaleDateString()}
                        )
                    </h1>
                    <div className="flex p-4">
                        <Link
                            href="#"
                            onClick={handleShowForm}
                            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            New
                        </Link>

                        <Link href="/"
                            className="mx-3 py-2 px-4 border border-blue-500 text-blue-500 rounded-md"
                        >
                            戻る
                        </Link>
                    </div>

                    {isFormVisible && (
                        <PlanItemForm plan={plan} onSubmit={handleAddPlanItem} onClose={handleHideForm} />
                    )}

                    <PlanItemList plan={plan} planItems={planItems} onUpdate={handleUpdatePlanItem} />
                </div>
            }
        </div>
    );
};

export default PlanDetailPage;
