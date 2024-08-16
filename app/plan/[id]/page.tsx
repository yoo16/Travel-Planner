'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PlanItemForm from '@/app/components/PlanItemForm';
import Link from 'next/link';
import PlanItemList from '@/app/components/PlanItemList';

const PlanDetailPage: React.FC = () => {
    const { id } = useParams();

    const [plan, setPlan] = useState<Plan | null>(null);
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchPlanDetails = async () => {
            try {
                const planResponse = await axios.get(`/api/plan/${id}`);
                setPlan(planResponse.data);
                setPlanItems(planResponse.data.planItems);
            } catch (error) {
                console.error('Error fetching plan details:', error);
            }
        };

        fetchPlanDetails();
    }, [id]);

    const handleAddPlanItem = (newPlanItem: PlanItem) => {
        setPlanItems([...planItems, newPlanItem]);
        setIsFormVisible(false);
    };

    const handleShowForm = () => {
        setIsFormVisible(true);
    };

    const handleHideForm = () => {
        setIsFormVisible(false);
    }

    const handleUpdatePlanItem = (updatedItem: PlanItem) => {
        setPlanItems((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    if (!plan) {
        return <div>Loading...</div>;
    }

    return (
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
                    新規追加
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
    );
};

export default PlanDetailPage;
