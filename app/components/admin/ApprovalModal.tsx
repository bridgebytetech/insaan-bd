// components/admin/ApprovalModal.tsx
'use client';
import { useState } from 'react';
import { Modal } from '@/app/components/shared/Modal';
import { Button } from '@/app/components/shared/Button';
import { Orphan } from '@/app/lib/types';
import Image from 'next/image';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orphan: Orphan;
  onConfirm: (notes: string) => void;
}

export default function ApprovalModal({ isOpen, onClose, orphan, onConfirm }: ApprovalModalProps) {
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    onConfirm(notes);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Approve Orphan Registration">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Image src={orphan.imageUrl} alt={orphan.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{orphan.name}</h3>
            <p className="text-gray-600">{orphan.age} years • {orphan.location}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700">{orphan.story}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Monthly Need:</span>
            <p className="text-blue-600">৳{orphan.monthlyNeed.toLocaleString()}</p>
          </div>
          <div>
            <span className="font-semibold">Sponsors Needed:</span>
            <p>{orphan.totalSponsorsNeeded}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Approval Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            rows={3}
            placeholder="Add any notes about this approval..."
          />
        </div>

        <div className="flex gap-3">
          <Button variant="primary" onClick={handleConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
            ✓ Approve & Publish
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Once approved, this orphan profile will be visible on the public website
        </p>
      </div>
    </Modal>
  );
}
