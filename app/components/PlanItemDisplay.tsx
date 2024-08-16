import React from 'react';

interface PlanItemDisplayProps {
    planItem: PlanItem;
    onEdit: () => void;
}

const PlanItemDisplay: React.FC<PlanItemDisplayProps> = ({ planItem, onEdit }) => {
    return (
        <div className="flex">
            <div>
                <button
                    onClick={onEdit}
                    className="py-1 px-4 bg-yellow-500 text-white rounded-md"
                >
                    Edit
                </button>
            </div>
            <div className="text-gray-700">
                <span className="text-xs rounded p-2 mx-2 bg-green-500 text-white">
                    アクティビティ
                </span>
                {planItem.activity}
            </div>

            <div className="text-gray-700">
                <span className="text-xs rounded p-2 mx-2 bg-green-500 text-white">
                    場所
                </span>
                {planItem.place}
                {planItem.transportation && (
                    <>
                        <span className="text-xs rounded p-2 mx-2 bg-green-500 text-white">
                            交通
                        </span>
                        {planItem.transportation}
                    </>
                )}
            </div>

            <div className="text-gray-700 mx-2">
                {planItem.memo}
            </div>
        </div>
    );
};

export default PlanItemDisplay;
