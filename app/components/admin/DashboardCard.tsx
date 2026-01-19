'use client';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

export default function DashboardCard({ title, value, icon: Icon, trend, color }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-[#2A9D8F]/10 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-600">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-[#264653] mt-1">{value}</h3>
      </div>
    </motion.div>
  );
}