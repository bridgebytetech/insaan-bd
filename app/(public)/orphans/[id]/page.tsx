
// ==========================================
// app/(public)/orphans/[id]/page.tsx
// ==========================================
import { orphanApi } from '@/app/lib/api/orphans';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function OrphanDetailsPage({ params }: { params: { id: string } }) {
  const orphan = await orphanApi.getById(params.id);

  if (!orphan || orphan.status !== 'approved') {
    notFound();
  }

  const sponsorshipProgress = (orphan.currentSponsors / orphan.totalSponsorsNeeded) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/orphans" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
        ← Back to All Children
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image src={orphan.imageUrl} alt={orphan.name} fill className="object-cover" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{orphan.name}</h1>
          
          <div className="space-y-3 mb-6 text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold w-32">Age:</span>
              <span>{orphan.age} years old</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Gender:</span>
              <span className="capitalize">{orphan.gender}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Location:</span>
              <span>{orphan.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Monthly Need:</span>
              <span className="text-blue-600 font-semibold">৳{orphan.monthlyNeed.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3">Sponsorship Status</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{orphan.currentSponsors} of {orphan.totalSponsorsNeeded} sponsors</span>
                <span>{Math.round(sponsorshipProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${sponsorshipProgress}%` }}
                />
              </div>
            </div>
            {orphan.currentSponsors < orphan.totalSponsorsNeeded && (
              <p className="text-sm text-gray-600 mt-2">
                {orphan.totalSponsorsNeeded - orphan.currentSponsors} more {orphan.totalSponsorsNeeded - orphan.currentSponsors === 1 ? 'sponsor' : 'sponsors'} needed
              </p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Story</h3>
            <p className="text-gray-700 leading-relaxed">{orphan.story}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/donors/register"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Sponsor {orphan.name}
            </Link>
            <Link
              href="/contact"
              className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-blue-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4">What Your Sponsorship Provides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-semibold mb-2">Education</h4>
            <p className="text-gray-600 text-sm">School fees, books, uniforms, and supplies</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🏥</div>
            <h4 className="font-semibold mb-2">Healthcare</h4>
            <p className="text-gray-600 text-sm">Regular checkups and medical care</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🍽️</div>
            <h4 className="font-semibold mb-2">Nutrition</h4>
            <p className="text-gray-600 text-sm">Healthy meals and nutritional support</p>
          </div>
        </div>
      </div>
    </div>
  );}