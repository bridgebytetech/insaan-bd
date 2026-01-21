"use client";
import { useEffect, useState, use } from "react";
import { donorService } from "@/app/lib/services/donorService";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DonorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await donorService.getDonorById(Number(resolvedParams.id));
        if (res.success) setDonor(res.data);
      } catch (e) {
        toast.error("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [resolvedParams.id]);

  if (loading)
    return <div className="p-10 text-center font-bold">Loading Details...</div>;
  if (!donor)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Donor Not Found
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <Link
        href="/admin/donors"
        className="flex items-center gap-2 text-gray-500 hover:text-[#264653] font-bold"
      >
        <ArrowLeft size={20} /> Back to Directory
      </Link>

      <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1 space-y-6 flex flex-col items-center border-r border-gray-50 pr-10">
          <div className="w-40 h-40 rounded-[2.5rem] bg-[#264653] text-white flex items-center justify-center text-6xl font-black shadow-xl">
            {donor.donorName?.charAt(0)}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#264653]">
              {donor.donorName}
            </h2>
            <p className="text-[#2A9D8F] font-bold uppercase text-xs tracking-widest mt-1">
              {donor.donorType}
            </p>
          </div>
          <div
            className={`px-6 py-2 rounded-2xl font-black text-xs uppercase ${donor.isActive ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}
          >
            {donor.isActive ? "Active Donor" : "Deactivated"}
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section>
            <h3 className="text-sm font-black text-gray-300 uppercase tracking-widest mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard
                icon={<Mail size={18} />}
                label="Email"
                value={donor.donorEmail}
              />
              <InfoCard
                icon={<Phone size={18} />}
                label="Phone"
                value={donor.donorContact}
              />
              <div className="sm:col-span-2">
                <InfoCard
                  icon={<MapPin size={18} />}
                  label="Office/Home Address"
                  value={donor.donorAddress}
                />
              </div>
            </div>
          </section>

          {donor.donorType === "ORGANIZATION" && (
            <section>
              <h3 className="text-sm font-black text-gray-300 uppercase tracking-widest mb-4">
                Organization Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#EDF4E8]/50 p-6 rounded-[2rem]">
                <InfoCard
                  icon={<Building2 size={18} />}
                  label="Company Name"
                  value={donor.organizationName}
                />
                <InfoCard
                  icon={<ShieldCheck size={18} />}
                  label="Registration No"
                  value={donor.organizationRegistrationNo || "N/A"}
                />
              </div>
            </section>
          )}

          <section className="bg-[#264653] text-white p-8 rounded-[2.5rem] flex justify-between items-center shadow-lg">
            <div>
              <p className="text-[#2A9D8F] font-black text-xs uppercase mb-1">
                Impact Level
              </p>
              <h4 className="text-2xl font-black">
                Supporting {donor.totalConnectedOrphans || 0} Orphans
              </h4>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-[#2A9D8F] flex items-center justify-center font-bold">
              {donor.totalConnectedOrphans || 0}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gray-50 rounded-xl text-[#2A9D8F]">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-gray-300 uppercase">
          {label}
        </p>
        <p className="font-bold text-[#264653]">{value}</p>
      </div>
    </div>
  );
}
