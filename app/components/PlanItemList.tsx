'use client';

import React, { useState } from 'react';
import PlanItemForm from '@/app/components/PlanItemForm';  // PlanItemFormをインポート

interface PlanItemListProps {
    plan: Plan;
    planItems: PlanItem[];
    onUpdate: (updatedItem: PlanItem) => void;
}

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, planItems, onUpdate }) => {
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
        <ul className="m-4">
            {planItems.map((item) => (
                <li key={item.id} className="p-4 border-b">
                    {editingItem && editingItem.id === item.id ? (
                        <PlanItemForm plan={plan} planItem={editingItem} onSubmit={handleUpdate} onClose={handleCancelEdit} />
                    ) : (
                        <div className="flex">
                            <div>
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className="mx-4 py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    編集
                                </button>
                            </div>
                            <div>
                                <span className="me-3">{new Date(item.date).toLocaleDateString()}</span>
                                <span className="p-2 me-3 text-xs text-white bg-green-500">アクティビティ</span>
                                <span className="me-3">{item.activity}</span>
                                <span className="p-2 me-3 text-xs text-white bg-green-500">場所</span>
                                <span className="me-3">{item.place}</span>
                                <span className="p-2 me-3 text-xs text-white bg-green-500">交通手段</span>
                                <span>{item.transportation}</span>
                                <p className="py-3">{item.memo}</p>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default PlanItemList;
