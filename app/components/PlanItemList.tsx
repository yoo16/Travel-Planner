import React from 'react';
import PlanItemDisplay from './PlanItemDisplay';

interface PlanItemListProps {
    plan: Plan;
    initialPlanItems: PlanItem[][];
}

const formatDayLabel = (date?: Date) => {
    if (!date) {
        return '日付未設定';
    }

    return new Date(date).toLocaleDateString('ja-JP', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
    });
};

const PlanItemList: React.FC<PlanItemListProps> = ({ plan, initialPlanItems }) => {
    const planItems = initialPlanItems;

    if (!planItems || planItems.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <h2 className="text-xl font-black text-slate-950">まだ行程がありません</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    マイプランから編集すると、日別の行程を追加できます。
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-8">
            {planItems.map((dayPlanItems, dayIndex) => (
                <div key={dayIndex} className="grid gap-5 lg:grid-cols-[180px_1fr]">
                    <div className="lg:pt-1">
                        <div className="sticky top-24 rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm font-black text-emerald-700">Day {dayIndex + 1}</p>
                            <h2 className="mt-2 text-lg font-black text-slate-950">
                                {formatDayLabel(dayPlanItems[0]?.date)}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">{dayPlanItems.length}件の予定</p>
                        </div>
                    </div>

                    <div className="relative space-y-4 border-l border-slate-200 pl-5 sm:pl-7">
                        {dayPlanItems.map((planItem, planItemIndex) => (
                            <div key={planItem.id ?? planItemIndex} className="relative">
                                <span className="absolute -left-[29px] top-6 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm sm:-left-[37px]" />
                                <PlanItemDisplay plan={plan} planItem={planItem} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default PlanItemList;
