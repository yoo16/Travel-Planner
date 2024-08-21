'use client';

import React, { useState } from 'react';
import PlanItemForm from '@/app/components/PlanItemForm';
import PlanItemDisplay from './PlanItemDisplay';
import { dateList } from '../services/Date';
import Link from 'next/link';

interface PlanItemListProps {
    plan: Plan;
    planItems: PlanItem[][];
}

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, planItems }) => {
    const [editingItem, setEditingItem] = useState<PlanItem | null>(null);

    const onEdit = (planItem: PlanItem) => {
        setEditingItem(planItem);
    };

    const onCancelEdit = () => {
        setEditingItem(null);
    }

    const onUpdate = (updatedItem: PlanItem) => {
        setEditingItem(null);
    };

    const onDelete = () => {
        setEditingItem(null);
        planItems = [];
    };

    return (
        <div className="m-5">
            <div className="m-5">
                {dateList(plan.departureDate, plan.arrivalDate).map((dateOption, dayIndex) => (
                    <div key={dayIndex} className="border-b p-6">
                        <h2 className="text-2xl font-bold text-gray-600 mb-6">
                            {new Date(dateOption).toLocaleDateString()} - {dayIndex + 1}日目 -
                        </h2>

                        <div className="my-2">
                            <Link
                                href="#"
                                className="me-2 py-1 px-4 bg-yellow-500 text-white rounded-md"
                            >
                                Add
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {planItems[dayIndex] && planItems[dayIndex].map((planItem, planItemIndex) => (
                                <div key={planItemIndex}>

                                    {editingItem && planItem.id === editingItem.id ? (
                                        <PlanItemForm
                                            plan={plan}
                                            planItem={planItem}
                                            onSubmit={onUpdate}
                                            onDelete={onDelete}
                                            onClose={onCancelEdit}
                                        />
                                    ) : (
                                        <PlanItemDisplay
                                            planItem={planItem}
                                            onEdit={() => onEdit(planItem)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanItemList;
