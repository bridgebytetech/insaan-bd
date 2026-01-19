"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  School,
  FileText,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/lib/api/axios";

export default function OrphanDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [orphan, setOrphan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrphan = async () => {
    try {
      const res = await api.get(`/admin/orphans/${id}`);
      setOrphan(res.data.data);
    } catch (err) {
      console.error("Fetch orphan failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrphan();
  }, [id]);

  const handleApprove = async () => {
    if (!confirm("Approve this orphan?")) return;
    await api.put(`/admin/orphans/${id}/approve`);
    fetchOrphan();
  };

  const handleReject = async () => {
    if (!confirm("Reject this orphan?")) return;
    await api.put(`/admin/orphans/${id}/reject`);
    fetchOrphan();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this orphan permanently?")) return;
    await api.delete(`/admin/orphans/${id}`);
    alert("Deleted");
    router.push("/admin/orphans");
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!orphan) return <p className="text-center py-20">Not found</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <Link
          href="/admin/orphans"
          className="flex items-center gap-2 text-gray-500 font-bold hover:text-[#264653]"
        >
          <ArrowLeft size={20} /> Back to List
        </Link>

        <div className="flex gap-3">
          {orphan.orphanStatus === "PENDING" && (
            <>
              <button
                onClick={handleReject}
                className="flex items-center gap-2 bg-[#E76F51]/10 text-[#E76F51] px-6 py-2 rounded-xl font-bold hover:bg-[#E76F51] hover:text-white"
              >
                <XCircle size={18} /> Reject
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 bg-[#2A9D8F] text-white px-6 py-2 rounded-xl font-bold shadow-lg"
              >
                <CheckCircle size={18} /> Approve
              </button>
            </>
          )}

          {orphan.orphanStatus === "APPROVED" && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white"
            >
              <Trash2 size={18} /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-[3rem] p-8 flex gap-8 items-center">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={orphan.orphanDpUrl || "/placeholder.png"}
          className="w-48 h-48 rounded-[2.5rem] object-cover"
        />
        <div>
          <h1 className="text-4xl font-black text-[#264653]">
            {orphan.orphanName}
          </h1>
          <p className="text-gray-500 font-bold">
            {orphan.orphanGender} • Age {orphan.orphanAge}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl">
          <h3 className="font-black mb-4 flex items-center gap-2">
            <FileText className="text-[#2A9D8F]" /> Guardian
          </h3>
          <p><b>Name:</b> {orphan.orphanViaName}</p>
          <p><b>Relation:</b> {orphan.orphanViaRelation}</p>
          <p><b>Contact:</b> {orphan.orphanViaContact}</p>
          <p><b>Address:</b> {orphan.orphanViaAddress}</p>
        </section>

        <section className="bg-white p-8 rounded-3xl">
          <h3 className="font-black mb-4 flex items-center gap-2">
            <School className="text-[#2A9D8F]" /> Education
          </h3>
          <p><b>Institute:</b> {orphan.orphanEducationInstitute}</p>
          <p><b>Level:</b> {orphan.orphanEducationLevel}</p>
          <p><b>Class:</b> {orphan.orphanClassGrade}</p>
        </section>
      </div>
    </div>
  );
}
