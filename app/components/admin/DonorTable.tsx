'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, PowerOff, CheckCircle, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DonorTable({ donors, onToggleStatus, onApprove, onDelete }: any) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#EDF4E8]/50 border-b border-gray-100 text-[#264653]">
              <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">Donor Info</th>
              <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-right text-xs font-black uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {donors.map((donor: any) => {
              const dId = donor.donorId || donor.userId;
              return (
                <tr key={dId} className="hover:bg-[#EDF4E8]/20 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#264653] text-white flex items-center justify-center font-bold">
                        {(donor.donorName || donor.name || 'D').charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#264653]">{donor.donorName || donor.name}</p>
                        <p className="text-[10px] text-gray-400">{donor.donorEmail || donor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-black uppercase ${donor.isActive ? 'text-green-500' : 'text-gray-400'}`}>
                      {donor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/donors/${dId}`} className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Eye size={18}/></Link>
                      <button onClick={() => onApprove(dId)} className="p-2 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={18}/></button>
                      <button onClick={() => onDelete(dId)} className="p-2 bg-red-50 text-red-500 rounded-xl"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}