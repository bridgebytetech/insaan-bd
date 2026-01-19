"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import api from "@/app/lib/api/axios";

export default function AddOrphanPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    orphanName: "",
    orphanAge: "",
    orphanGender: "MALE",
    orphanDob: "",
    orphanDpUrl: "",
    orphanEducationInstitute: "",
    orphanEducationLevel: "",
    orphanEducationInstituteAddress: "",
    orphanHealthCondition: "",
    currentSchoolName: "",
    orphanClassGrade: "",
    previousSchoolName: "",
    orphanAddress: "",
    orphanFatherName: "",
    orphanMotherName: "",
    orphanContact: "",
    orphanViaName: "",
    orphanViaContact: "",
    orphanViaAddress: "",
    orphanViaRelation: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/admin/orphans", {
        ...form,
        orphanAge: Number(form.orphanAge),
      });
      alert("Orphan registered successfully!");
      router.push("/admin/orphans");
    } catch (err) {
      console.error("Add orphan error:", err);
      alert("Failed to register orphan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/admin/orphans"
          className="flex items-center gap-2 text-gray-500 font-bold hover:text-[#264653]"
        >
          <ArrowLeft size={20} /> Back
        </Link>
        <h1 className="text-2xl font-black text-[#264653]">
          Register New Orphan
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Info */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-[#264653] border-l-4 border-[#2A9D8F] pl-4">
            1. Child Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                Full Name
              </label>
              <input
                name="orphanName"
                value={form.orphanName}
                onChange={handleChange}
                className="w-full p-4 bg-[#EDF4E8]/30 rounded-2xl outline-none focus:ring-2 ring-[#2A9D8F]"
                placeholder="Child's Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Age
                </label>
                <input
                  name="orphanAge"
                  type="number"
                  value={form.orphanAge}
                  onChange={handleChange}
                  className="w-full p-4 bg-[#EDF4E8]/30 rounded-2xl outline-none"
                  placeholder="e.g. 8"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">
                  Gender
                </label>
                <select
                  name="orphanGender"
                  value={form.orphanGender}
                  onChange={handleChange}
                  className="w-full p-4 bg-[#EDF4E8]/30 rounded-2xl outline-none"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>

            <input
              name="orphanDob"
              type="date"
              value={form.orphanDob}
              onChange={handleChange}
              className="w-full p-4 bg-[#EDF4E8]/30 rounded-2xl outline-none"
            />

            <input
              name="orphanAddress"
              value={form.orphanAddress}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-4 bg-[#EDF4E8]/30 rounded-2xl outline-none"
            />

            <input
              name="orphanContact"
              value={form.orphanContact}
              onChange={handleChange}
              placeholder="Contact"
              className="w-full p-4 bg-[#EDF4E8]/30 rounded-2xl outline-none"
            />
          </div>
        </div>

        {/* Step 2: Other Info */}
        <div className="bg-[#264653] p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl">
          <h3 className="text-lg font-black text-[#2A9D8F]">
            2. Additional Information
          </h3>

          <input
            name="orphanEducationInstitute"
            value={form.orphanEducationInstitute}
            onChange={handleChange}
            placeholder="Education Institute"
            className="w-full p-4 rounded-2xl text-black"
          />

          <input
            name="orphanEducationLevel"
            value={form.orphanEducationLevel}
            onChange={handleChange}
            placeholder="Education Level"
            className="w-full p-4 rounded-2xl text-black"
          />

          <textarea
            name="orphanHealthCondition"
            value={form.orphanHealthCondition}
            onChange={handleChange}
            placeholder="Health Condition"
            className="w-full p-4 rounded-2xl text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-[#2A9D8F] text-white rounded-[2rem] font-black text-xl shadow-lg hover:shadow-[#2A9D8F]/40 transition-all flex items-center justify-center gap-3"
        >
          <Save size={24} /> Save Orphan Registration
        </button>
      </form>
    </div>
  );
}
