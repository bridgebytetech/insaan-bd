// components/admin/OrphanTable.tsx
'use client';
import { Orphan } from '@/app/lib/types';
import Image from 'next/image';

interface OrphanTableProps {
  orphans: Orphan[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OrphanTable({ orphans, onApprove, onReject, onDelete }: OrphanTableProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orphans.map((orphan) => (
              <tr key={orphan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={orphan.imageUrl} alt={orphan.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{orphan.name}</td>
                <td className="px-6 py-4">{orphan.age}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{orphan.location}</td>
                <td className="px-6 py-4">{getStatusBadge(orphan.status)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{orphan.dateSubmitted}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {orphan.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onApprove(orphan.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onReject(orphan.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(orphan.id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}