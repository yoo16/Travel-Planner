'use client';

import React, { useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { FaGripVertical, FaPlus } from 'react-icons/fa6';
import PlanItemDisplay from './PlanItemDisplay';
import PlanItemModal from './PlanItemModal';
import { dateList, dateToString } from '../services/Date';

interface PlanItemEditListProps {
    plan: Plan;
    initialPlanItems: PlanItem[][];
}

const formatDayLabel = (date: string) => (
    new Date(date).toLocaleDateString('ja-JP', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    })
);

const alignPlanItemsToDates = (plan: Plan, items: PlanItem[][]) => {
    const travelDates = dateList(plan.departureDate, plan.arrivalDate);
    const flatItems = items.flat();

    return travelDates.map((date) =>
        flatItems.filter((item) => dateToString(item.date) === date),
    );
};

const PlanItemEditList: React.FC<PlanItemEditListProps> = ({ plan, initialPlanItems }) => {
    const travelDates = useMemo(() => dateList(plan.departureDate, plan.arrivalDate), [plan.arrivalDate, plan.departureDate]);

    const [planItems, setPlanItems] = useState<PlanItem[][]>(() => alignPlanItemsToDates(plan, initialPlanItems));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PlanItem | null>(null);
    const [busyDayIndex, setBusyDayIndex] = useState<number | null>(null);
    const [isReordering, setIsReordering] = useState(false);

    const fetchPlanItems = async () => {
        if (!plan.id) return;

        try {
            const response = await fetch(`/api/plan/${plan.id}`);

            if (response.ok) {
                const data = await response.json();
                setPlanItems(alignPlanItemsToDates(plan, data.planItems ?? []));
            }
        } catch (error) {
            console.error('Error fetching plan items:', error);
        }
    };

    const onAdd = async (event: React.MouseEvent, dayIndex: number) => {
        event.preventDefault();
        if (typeof plan.id === 'undefined') return;

        try {
            setBusyDayIndex(dayIndex);
            const newPlanItem: PlanItem = {
                planId: plan.id,
                date: new Date(travelDates[dayIndex]),
                transportation: '',
                place: '',
                activity: '',
                memo: '',
                order: planItems[dayIndex]?.length ?? 0,
            };
            const response = await fetch('/api/plan_item/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlanItem),
            });

            if (response.ok) {
                const planItem = await response.json();
                const updatedPlanItems = planItems.map((dayItems) => [...dayItems]);
                updatedPlanItems[dayIndex] = [...(updatedPlanItems[dayIndex] ?? []), planItem];
                setPlanItems(updatedPlanItems);
                onEdit(planItem);
            }
        } catch (error) {
            console.error('Error saving plan item:', error);
        } finally {
            setBusyDayIndex(null);
        }
    };

    const onEdit = (planItem: PlanItem) => {
        setEditingItem(planItem);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setEditingItem(null);
        setIsModalOpen(false);
    };

    const handleUpdate = async () => {
        await fetchPlanItems();
        handleClose();
    };

    const handleDelete = async () => {
        await fetchPlanItems();
        handleClose();
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const sourceDayIndex = parseInt(result.source.droppableId, 10);
        const destinationDayIndex = parseInt(result.destination.droppableId, 10);
        const updatedPlanItems = planItems.map((dayItems) => [...dayItems]);
        const [removed] = updatedPlanItems[sourceDayIndex].splice(sourceIndex, 1);

        removed.date = new Date(travelDates[destinationDayIndex]);
        updatedPlanItems[destinationDayIndex].splice(destinationIndex, 0, removed);
        setPlanItems(updatedPlanItems);

        try {
            setIsReordering(true);
            await fetch(`/api/plan/${plan.id}/items/update_order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planItems: updatedPlanItems.flatMap((dayItems, dayIndex) =>
                        dayItems.map((item, index) => ({
                            ...item,
                            date: new Date(travelDates[dayIndex]),
                            order: index + 1,
                        })),
                    ),
                }),
            });
        } catch (error) {
            console.error('Error updating plan item order:', error);
        } finally {
            setIsReordering(false);
        }
    };

    return (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            {isModalOpen && editingItem && (
                <PlanItemModal
                    plan={plan}
                    planItem={editingItem}
                    onSubmit={handleUpdate}
                    onClose={handleClose}
                    onDelete={handleDelete}
                />
            )}

            <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Itinerary editor</p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">行程編集</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {planItems.flat().length}件
                </span>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="space-y-6">
                    {travelDates.map((date, dayIndex) => (
                        <div key={date} className="grid gap-4 lg:grid-cols-[150px_1fr]">
                            <div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-black text-emerald-700">Day {dayIndex + 1}</p>
                                    <h3 className="mt-2 text-base font-black text-slate-950">{formatDayLabel(date)}</h3>
                                    <button
                                        onClick={(event) => onAdd(event, dayIndex)}
                                        disabled={busyDayIndex !== null || isReordering}
                                        className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                                    >
                                        <FaPlus aria-hidden="true" />
                                        {busyDayIndex === dayIndex ? '追加中...' : '追加'}
                                    </button>
                                </div>
                            </div>

                            <Droppable droppableId={`${dayIndex}`}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`min-h-[120px] rounded-lg border border-dashed p-3 transition ${snapshot.isDraggingOver ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50/60'}`}
                                    >
                                        {planItems[dayIndex]?.length ? (
                                            <div className="space-y-3">
                                                {planItems[dayIndex].map((planItem, planItemIndex) => (
                                                    <Draggable
                                                        key={planItem.id}
                                                        draggableId={`${planItem.id}`}
                                                        index={planItemIndex}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className={snapshot.isDragging ? 'opacity-90' : ''}
                                                            >
                                                                <div className="grid gap-3 sm:grid-cols-[36px_1fr]">
                                                                    <button
                                                                        type="button"
                                                                        {...provided.dragHandleProps}
                                                                        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 transition hover:text-emerald-700"
                                                                        aria-label="予定を並び替え"
                                                                    >
                                                                        <FaGripVertical aria-hidden="true" />
                                                                    </button>
                                                                    <PlanItemDisplay
                                                                        plan={plan}
                                                                        planItem={planItem}
                                                                        onEdit={() => onEdit(planItem)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex min-h-[92px] items-center justify-center rounded-md bg-white text-sm font-semibold text-slate-500">
                                                この日の予定はまだありません
                                            </div>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </section>
    );
};

export default PlanItemEditList;
