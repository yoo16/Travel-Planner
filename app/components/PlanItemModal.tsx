'use client';

import React, { useState } from 'react';
import Modal from '@/app/components/Modal';
import PlanItemForm from '@/app/components/PlanItemForm';

interface PlanItemModalProps {
    plan: Plan,
    planItem: PlanItem;
    onSubmit: (planItem: PlanItem) => void;
    onClose: () => void;
    onDelete: (planItemId: number) => void;
}

const PlanItemModal = ({ plan, planItem, onSubmit, onClose, onDelete }: PlanItemModalProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <PlanItemForm
                plan={plan}
                planItem={planItem}
                onSubmit={onSubmit}
                onClose={handleClose}
                onDelete={onDelete}
            />
        </Modal>
    );
};

export default PlanItemModal;