// components/public/HeroSection.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20" />
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Give Hope, Change Lives
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Support orphaned children in Bangladesh and help them build a brighter future
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/donors/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Become a Donor
            </Link>
            <Link
              href="/orphans"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              View Children
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"
      />
    </section>
  );
}