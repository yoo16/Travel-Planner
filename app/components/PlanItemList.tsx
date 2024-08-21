'use client';

import React, { useState } from 'react';
import PlanItemForm from '@/app/components/PlanItemForm';
import PlanItemDisplay from './PlanItemDisplay';
import { dateList } from '../services/Date';
import Link from 'next/link';
import axios from 'axios';

interface PlanItemListProps {
    plan: Plan;
    initialPlanItems: PlanItem[][];
}

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, initialPlanItems }) => {
    const [planItems, setPlanItems] = useState<PlanItem[][]>(initialPlanItems);
    const [editingItem, setEditingItem] = useState<PlanItem | null>(null);

    const fetchPlanItems = async () => {
        if (!plan.id) return;

        try {
            const response = await axios.get(`/api/plan/${plan.id}`);
            if (response.status === 200) {
                setPlanItems(response.data.planItems);
            }
        } catch (error) {
            console.error('Error fetching plan items:', error);
        }
    };

    const onAdd = async (e: React.MouseEvent, dateOption: string) => {
        e.preventDefault();
        if (typeof plan?.id === 'undefined') return;

        try {
            const newPlanItem: PlanItem = {
                planId: plan.id,
                date: new Date(dateOption),
                transportation: '',
                place: '',
                activity: '',
                memo: ''
            };
            const uri = `/api/plan_item/add`;
            const response = await axios.post(uri, newPlanItem);
            const planItem = response.data;
            console.log(planItem);

            if (planItem.id > 0) {
                const updatedPlanItems = [...planItems];
                const dayIndex = dateList(plan.departureDate, plan.arrivalDate).indexOf(dateOption);

                if (updatedPlanItems[dayIndex]) {
                    updatedPlanItems[dayIndex] = [...updatedPlanItems[dayIndex], planItem];
                } else {
                    updatedPlanItems[dayIndex] = [planItem];
                }
                setPlanItems(updatedPlanItems);
                onEdit(planItem);
            }
        } catch (error) {
            console.error('Error saving plan item:', error);
        }
    };

    const onEdit = (planItem: PlanItem) => {
        setEditingItem(planItem);
    };

    const onCancelEdit = () => {
        setEditingItem(null);
    }

    const onUpdate = async (updatedItem: PlanItem) => {
        await fetchPlanItems();
        setEditingItem(null);
    };

    const onDelete = async () => {
        await fetchPlanItems();
        setEditingItem(null);
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
                                onClick={(e) => onAdd(e, dateOption)}
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
