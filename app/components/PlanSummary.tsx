'use client'

import React from 'react';
import Link from 'next/link';
import { dateToString } from '@/app/services/Date';

interface PlanSummaryProps {
    plan: Plan;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({ plan }) => {
    return (
        <div className="my-5">
            <h2 className="text-2xl py-3">
                <span>{plan.departure}</span>
                <span className="m-2">-</span>
                <span>{plan.destination}</span>
            </h2>
            <div>
                <span className="py-1 px-2 me-3 rounded bg-green-500 text-white text-xs">
                    日程
                </span>
                {dateToString(plan.departureDate)}
                <span className="m-2">-</span>
                {dateToString(plan.arrivalDate)}

                <span className="py-1 px-2 mx-3 rounded bg-green-500 text-white text-xs">
                    予算
                </span>
                {plan.budget?.toLocaleString()}円
            </div>
        </div>
    );
};

export default PlanSummary;