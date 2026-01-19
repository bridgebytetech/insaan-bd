// ==========================================
// app/(public)/about/page.tsx
// ==========================================
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About OrphanCare</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide comprehensive care, education, and support to orphaned children, empowering them to become self-sufficient and productive members of society.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              A world where every orphaned child has access to quality education, healthcare, and opportunities to thrive.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Compassion and dignity for every child</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Transparency in all our operations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Sustainable impact through education</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">✓</span>
                <span>Community engagement and empowerment</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
