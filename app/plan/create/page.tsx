'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import { dateToString } from '@/app/services/Date';
import EditPlanForm from '@/app/components/EditPlanForm';
import CreatePlanForm from '@/app/components/CreatePlanForm';
import { useRouter } from 'next/navigation';

const PlanCreatePage: React.FC = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);

    const onSave = () => {
        router.push('/');
    };

    const onCancelCreate = () => {
        router.push('/');
    };

    return (
        <div>
            {loading && <Loading />}
            <h1 className="text-center text-3xl p-3">Travel Planner</h1>
            <CreatePlanForm
                onSave={onSave}
                onClose={onCancelCreate}
            />
        </div>
    );
};

export default PlanCreatePage;
