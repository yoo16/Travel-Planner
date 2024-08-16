'use client';

import React, { useState } from 'react';
import PlanItemForm from '@/app/components/PlanItemForm';
import PlanItemDisplay from './PlanItemDisplay';

interface PlanItemListProps {
    plan: Plan;
    onUpdate: (updatedItem: PlanItem) => void;
}

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, onUpdate }) => {
    const [editingItem, setEditingItem] = useState<PlanItem | null>(null);

    const handleEditClick = (item: PlanItem) => {
        setEditingItem(item);
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
    };

    const handleUpdate = (updatedItem: PlanItem) => {
        onUpdate(updatedItem);
        setEditingItem(null);
    };

    return (
        <>
            <div className="m-5">
                {plan?.planItems && plan.planItems.map((dayPlans, dayIndex) => (
                    <div key={dayIndex} className="border-b p-6">
                        <h2 className="text-2xl font-bold text-gray-600 mb-6">
                            {new Date(dayPlans[0].date).toLocaleDateString()} - {dayIndex + 1}日目 -
                        </h2>
                        <div className="space-y-4">
                            {dayPlans.map((planItem, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                                    {editingItem && editingItem.id === planItem.id ? (
                                        <PlanItemForm
                                            plan={plan}
                                            planItem={editingItem}
                                            onSubmit={handleUpdate}
                                            onClose={handleCancelEdit}
                                        />
                                    ) : (
                                        <PlanItemDisplay
                                            planItem={planItem}
                                            onEdit={() => handleEditClick(planItem)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PlanItemList;
