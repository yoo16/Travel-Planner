'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { stayDuration } from '@/app/services/Date';
import { useLoading } from '@/app/context/LoadingContext';
import PlanList from '@/app/components/PlanList';

const Home: React.FC = () => {
    
    return (
        <div>
            <PlanList />
        </div>
    );
};

export default Home;
