'use client';

import React, { useState } from 'react';
import PlanItemForm from '@/app/components/PlanItemForm';
import PlanItemDisplay from './PlanItemDisplay';
import { dateList, dateToString } from '../services/Date';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useLoading } from '../context/LoadingContext';
import PlanItemModal from './PlanItemModal';

interface PlanItemListProps {
    plan: Plan;
    initialPlanItems: PlanItem[][];
}

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, initialPlanItems }) => {
    const { setLoading } = useLoading();

    const [planItems, setPlanItems] = useState<PlanItem[][]>(initialPlanItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PlanItem | null>(null);

    const fetchPlanItems = async () => {
        if (!plan.id) return;

        try {
            setLoading(true);
            const response = await axios.get(`/api/plan/${plan.id}`);
            if (response.status === 200) {
                setPlanItems(response.data.planItems);
            }
        } catch (error) {
            console.error('Error fetching plan items:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {planItems && planItems.map((dayPlanItems, dayIndex) => (
                <div key={dayIndex}>
                    <div className="mt-6">
                        <h2 className="text-xl text-gray-600 mb-6">
                            {new Date(dayPlanItems[0].date).toLocaleDateString()} - {dayIndex + 1}日目 -
                        </h2>
                    </div>
                    <div>
                        {
                            dayPlanItems.map((planItem, planItemIndex) => (
                                <div
                                    className="my-4"
                                    key={planItemIndex}
                                >
                                    <PlanItemDisplay

                                        plan={plan}
                                        planItem={planItem}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlanItemList;
