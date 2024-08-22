'use client';

import React, { useState } from 'react';
import PlanItemForm from '@/app/components/PlanItemForm';
import PlanItemDisplay from './PlanItemDisplay';
import { dateList, dateToString } from '../services/Date';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useLoading } from '../context/LoadingContext';

interface PlanItemListProps {
    plan: Plan;
    initialPlanItems: PlanItem[][];
}

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, initialPlanItems }) => {
    const { setLoading } = useLoading();

    const [planItems, setPlanItems] = useState<PlanItem[][]>(initialPlanItems);
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

    const onAdd = async (e: React.MouseEvent, date: Date) => {
        e.preventDefault();
        if (typeof plan?.id === 'undefined') return;

        try {
            setLoading(true);
            const newPlanItem: PlanItem = {
                planId: plan.id,
                date: date,
                transportation: '',
                place: '',
                activity: '',
                memo: ''
            };
            const uri = `/api/plan_item/add`;
            const response = await axios.post(uri, newPlanItem);
            const planItem = response.data;

            if (planItem.id > 0) {
                const updatedPlanItems = [...planItems];
                const dayIndex = dateList(plan.departureDate, plan.arrivalDate).indexOf(dateToString(date));

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
        } finally {
            setLoading(false);
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

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const sourceDayIndex = parseInt(result.source.droppableId);
        const destinationDayIndex = parseInt(result.destination.droppableId);

        const updatedPlanItems = [...planItems];

        // もし日を跨いで移動する場合
        if (sourceDayIndex !== destinationDayIndex) {
            const [removed] = updatedPlanItems[sourceDayIndex].splice(sourceIndex, 1);
            removed.date = new Date(plan.departureDate);
            removed.date.setDate(new Date(plan.departureDate).getDate() + destinationDayIndex);
            updatedPlanItems[destinationDayIndex].splice(destinationIndex, 0, removed);
        } else {
            const [removed] = updatedPlanItems[sourceDayIndex].splice(sourceIndex, 1);
            updatedPlanItems[sourceDayIndex].splice(destinationIndex, 0, removed);
        }

        setPlanItems(updatedPlanItems);

        try {
            setLoading(true);
            await axios.post(`/api/plan/${plan.id}/items/update_order`, {
                planItems: updatedPlanItems.map((dayItems, dayIndex) => {
                    return dayItems.map((item, index) => ({
                        ...item,
                        order: index + 1,
                        date: new Date(plan.departureDate).setDate(new Date(plan.departureDate).getDate() + dayIndex),
                    }));
                }).flat(),
            });
        } catch (error) {
            console.error('Error updating plan item order:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {planItems.map((dayPlanItems, dayIndex) => (
                <div key={dayIndex}>
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-gray-600 mb-6">
                            {new Date(dayPlanItems[0].date).toLocaleDateString()} - {dayIndex + 1}日目 -
                        </h2>

                        <div className="my-2">
                            <button
                                onClick={(e) => onAdd(e, dayPlanItems[0].date)}
                                className="me-2 py-1 px-4 text-sm bg-yellow-500 text-white rounded-md"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <Droppable droppableId={`${dayIndex}`} key={dayIndex}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {dayPlanItems.map((planItem, planItemIndex) => (
                                    <Draggable
                                        key={planItem.id}
                                        draggableId={`${planItem.id}`}
                                        index={planItemIndex}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
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
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            ))}
        </DragDropContext>

    );
};

export default PlanItemList;
