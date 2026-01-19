"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // Handle newsletter signup
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            আপডেট থাকুন
          </h2>
          <p className="text-lg text-blue-100">
            আমাদের newsletter subscribe করুন এবং সর্বশেষ খবর পান
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল ঠিকানা"
              className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-blue-200 mt-4">
            আমরা আপনার privacy সম্মান করি। কোন spam নেই।
          </p>
        </div>
      </div>
    </section>
  );
}