"use client"
import React, { useState } from 'react';
import { Heart, DollarSign, ShieldCheck, ArrowRight, CreditCard, Users } from 'lucide-react';

const DonationForm = () => {
  const [amount, setAmount] = useState('50');
  const [isCustom, setIsCustom] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // For custom cursor interaction

  const presets = ['10', '25', '50', '100', '250'];

  return (
    <section className="relative py-24 bg-[#FDFDFD] overflow-hidden">
      {/* Background Textures - Matching Hero */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ECF4E8] rounded-full blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#2A9D8F]/5 rounded-full blur-[80px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT: Context & Encouragement */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#2A9D8F]/5 border border-[#2A9D8F]/10 rounded-lg">
              <Heart className="w-3.5 h-3.5 text-[#2A9D8F]" fill="currentColor" />
              <span className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-[0.2em]">Change a Life Today</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-[#264653] leading-tight">
              আপনার দান, <br />
              <span className="text-[#2A9D8F] italic font-serif">তাদের নতুন সপ্ন</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-gray-100">
                  <ShieldCheck className="text-[#2A9D8F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#264653]">১০০% স্বচ্ছতা</h4>
                  <p className="text-sm text-[#4A6651]/70">আপনার প্রতিটি টাকা সরাসরি শিশুদের শিক্ষা ও স্বাস্থ্যের জন্য ব্যয় করা হয়।</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-gray-100">
                  <Users className="text-[#2A9D8F]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#264653]">সরাসরি ইমপ্যাক্ট</h4>
                  <p className="text-sm text-[#4A6651]/70">দান করার পর আপনি নিয়মিত আপনার সহায়তাপ্রাপ্ত শিশুর আপডেট পাবেন।</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Donation Form Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(38,70,83,0.15)] border border-gray-100 relative overflow-hidden group">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-bl-[5rem] -z-10" />

              <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <p className="text-[#2A9D8F] font-black text-xs uppercase tracking-widest">Select Amount</p>
                  <h3 className="text-2xl font-black text-[#264653]">সহায়তার পরিমাণ নির্বাচন করুন</h3>
                </div>

                {/* Amount Selection Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {presets.map((val) => (
                    <button
                      key={val}
                      onClick={() => { setAmount(val); setIsCustom(false); }}
                      className={`py-4 rounded-2xl font-bold transition-all duration-300 ${
                        amount === val && !isCustom
                          ? 'bg-[#264653] text-white shadow-lg'
                          : 'bg-gray-50 text-[#264653] hover:bg-gray-100'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsCustom(true)}
                    className={`py-4 rounded-2xl font-bold transition-all duration-300 ${
                      isCustom
                        ? 'bg-[#264653] text-white shadow-lg'
                        : 'bg-gray-50 text-[#264653] hover:bg-gray-100'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {/* Custom Input (Shows if custom selected) */}
                {isCustom && (
                  <div className="relative animate-fade-in">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/20 focus:bg-white transition-all font-bold"
                    />
                  </div>
                )}

                {/* Payment Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:outline-none border border-transparent focus:border-gray-200"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:outline-none border border-transparent focus:border-gray-200"
                    />
                  </div>
                  <div className="relative">
                    <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:outline-none border border-transparent focus:border-gray-200"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full py-5 bg-[#2A9D8F] text-white rounded-[2rem] font-black text-lg shadow-xl shadow-[#2A9D8F]/20 hover:bg-[#264653] transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  Confirm Donation
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>

                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Secure 256-bit SSL encrypted payment
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </section>
  );
};

export default DonationForm;