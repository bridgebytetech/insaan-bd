"use client";
import { useEffect, useState, use } from "react";
import { donorService } from "@/app/lib/services/donorService";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Calendar } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DonorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [donor, setDonor] = useState<any>(null);

  useEffect(() => {
    donorService.getDonorById(Number(resolvedParams.id))
      .then(res => setDonor(res.data))
      .catch(() => toast.error("বিস্তারিত তথ্য পাওয়া যায়নি"));
  }, [resolvedParams.id]);

  if (!donor) return <div className="p-20 text-center font-black animate-pulse">Loading Details...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <Link href="/admin/donors" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#264653] font-black uppercase text-xs tracking-widest transition-all">
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-50 flex flex-col md:flex-row gap-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-40 h-40 rounded-[3rem] bg-[#264653] text-white flex items-center justify-center text-6xl font-black shadow-2xl">
            {donor.donorName.charAt(0)}
          </div>
          <div className={`px-6 py-2 rounded-2xl font-black text-[10px] uppercase tracking-tighter ${donor.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {donor.isActive ? "Active Account" : "Suspended"}
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-[#264653]">{donor.donorName}</h1>
            <p className="text-[#2A9D8F] font-black uppercase text-xs tracking-[0.3em] mt-1">{donor.donorType}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoItem icon={<Mail/>} label="Email" value={donor.donorEmail}/>
            <InfoItem icon={<Phone/>} label="Phone" value={donor.donorContact}/>
            <InfoItem icon={<MapPin/>} label="Address" value={donor.donorAddress} full/>
            {donor.donorType === 'ORGANIZATION' && (
              <>
                <InfoItem icon={<Building2/>} label="Organization" value={donor.organizationName}/>
                <InfoItem icon={<Calendar/>} label="Reg No" value={donor.organizationRegistrationNo}/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, full }: any) {
  return (
    <div className={`flex gap-4 p-4 bg-gray-50/50 rounded-2xl ${full ? 'md:col-span-2' : ''}`}>
      <div className="text-[#2A9D8F]">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{label}</p>
        <p className="font-bold text-[#264653]">{value || "N/A"}</p>
      </div>
    </div>
  );
}