'use client';
import { useState } from 'react';
import { ArrowLeft, Building2, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api/axios'; // আপনার axios ইন্টারসেপ্টর ফাইল
import toast from 'react-hot-toast'; // নোটিফিকেশনের জন্য (অপশনাল)

export default function AddDonorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [donorType, setDonorType] = useState<'INDIVIDUAL' | 'ORGANIZATION'>('INDIVIDUAL');

  // ১. ফর্ম স্টেট (আপনার API Schema অনুযায়ী)
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    donorPassword: '',
    donorContact: '',
    donorAddress: '',
    organizationName: '',
    organizationRegistrationNo: '',
    donorMessage: 'Added by Admin', // ডিফল্ট মেসেজ
    typeOfSupport: 'General Support', // ডিফল্ট সাপোর্ট
    donorDpUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // ডিফল্ট ছবি
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ২. সাবমিট ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API Call: POST /api/admin/donors
      const response = await api.post('/admin/donors', {
        ...formData,
        donorType: donorType,
        // অর্গানাইজেশন না হলে এগুলো খালি পাঠানো ভালো
        organizationName: donorType === 'ORGANIZATION' ? formData.organizationName : '',
        organizationRegistrationNo: donorType === 'ORGANIZATION' ? formData.organizationRegistrationNo : '',
      });

      if (response.data.success) {
        toast.success('Donor registered successfully!');
        router.push('/admin/donors'); // সফল হলে লিস্ট পেজে নিয়ে যাবে
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to register donor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/admin/donors" className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-[#264653] transition-colors">
        <ArrowLeft size={18} /> Back to Directory
      </Link>

      <div className="bg-white rounded-[3rem] p-6 md:p-10 border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-[#264653] mb-8">Manual Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Donor Type Toggle */}
          <div className="flex bg-[#EDF4E8] p-2 rounded-2xl w-full max-w-sm">
            <button 
              type="button"
              onClick={() => setDonorType('INDIVIDUAL')}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${donorType === 'INDIVIDUAL' ? 'bg-[#264653] text-white shadow-lg' : 'text-[#264653]/50'}`}
            >
              <User size={14} className="inline mr-2" /> Individual
            </button>
            <button 
              type="button"
              onClick={() => setDonorType('ORGANIZATION')}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${donorType === 'ORGANIZATION' ? 'bg-[#264653] text-white shadow-lg' : 'text-[#264653]/50'}`}
            >
              <Building2 size={14} className="inline mr-2" /> Organization
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField 
              label="Donor Full Name" 
              name="donorName"
              required
              value={formData.donorName}
              onChange={handleChange}
              placeholder="e.g. Mohammad Rahim" 
            />
            <InputField 
              label="Email Address" 
              name="donorEmail"
              type="email" 
              required
              value={formData.donorEmail}
              onChange={handleChange}
              placeholder="rahim@example.com" 
            />
            <InputField 
              label="Password" 
              name="donorPassword"
              type="password" 
              required
              value={formData.donorPassword}
              onChange={handleChange}
              placeholder="••••••••" 
            />
            <InputField 
              label="Phone Number (Connect)" 
              name="donorContact"
              required
              value={formData.donorContact}
              onChange={handleChange}
              placeholder="017XXXXXXXX" 
            />
            
            {donorType === 'ORGANIZATION' && (
              <>
                <InputField 
                  label="Organization Name" 
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="e.g. Tech Solutions Ltd" 
                />
                <InputField 
                  label="Registration No" 
                  name="organizationRegistrationNo"
                  value={formData.organizationRegistrationNo}
                  onChange={handleChange}
                  placeholder="REG-123456" 
                />
              </>
            )}
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Address</label>
              <textarea 
                name="donorAddress"
                required
                value={formData.donorAddress}
                onChange={handleChange}
                className="w-full p-5 bg-[#EDF4E8]/50 rounded-[2rem] outline-none h-32 focus:ring-2 ring-[#2A9D8F] font-bold text-[#264653]" 
                placeholder="Street, City, Postal Code..."
              ></textarea>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#2A9D8F] text-white rounded-[2.5rem] font-black text-xl shadow-lg hover:shadow-[#2A9D8F]/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Save Donor Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">{label}</label>
      <input 
        className="w-full p-5 bg-[#EDF4E8]/50 rounded-[2rem] outline-none focus:ring-2 ring-[#2A9D8F] font-bold text-[#264653] transition-all" 
        {...props} 
      />
    </div>
  );
}