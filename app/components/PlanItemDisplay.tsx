import React, { useState } from 'react';
import PlanItemModal from './PlanItemModal';

interface PlanItemDisplayProps {
    plan: Plan;
    planItem: PlanItem;
    onEdit?: () => void;
}

const PlanItemDisplay: React.FC<PlanItemDisplayProps> = ({ plan, planItem, onEdit }) => {

    return (
        <div key={planItem.id} className="bg-gray-100 p-2 rounded-lg shadow">
            <div className="text-gray-700 my-4">
                <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                    行動
                </span>
                {planItem.activity}
                <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                    場所
                </span>
                {planItem.place}
                {planItem.transportation && (
                    <>
                        <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                            移動
                        </span>
                        {planItem.transportation}
                    </>
                )}
            </div>

            <div className="text-gray-700 my-4">
                {planItem.accommodation &&
                    <>
                        <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                            宿泊先
                        </span>
                        {planItem.accommodation}
                    </>
                }
                <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                    予算
                </span>
                {planItem.budget?.toLocaleString()}
                <span className="px-1">円</span>
            </div>

            <div className="text-gray-700">
                <span className="text-xs font-semibold rounded p-2 mx-2  bg-green-500 text-white">
                    Memo
                </span>
                {planItem.memo}
            </div>

            {onEdit &&
                <div className="flex justify-end">
                    <button onClick={onEdit}
                        className="me-2 py-1 px-4 bg-yellow-500 text-white text-sm rounded-md"
                    >
                        Edit
                    </button>
                </div>
            }
        </div>
    );
};

export default PlanItemDisplay;
