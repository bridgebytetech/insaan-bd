// ==========================================
// app/(public)/contact/page.tsx
// ==========================================
'use client';
import { useState } from 'react';
import { Input } from '@/app/components/shared/Input';
import { Button } from '@/app/components/shared/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-semibold mb-2">📧 Email</h3>
                <p className="text-gray-600">info@orphancare.org</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📞 Phone</h3>
                <p className="text-gray-600">+880 1700-000000</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📍 Address</h3>
                <p className="text-gray-600">123 Hope Street, Gulshan<br />Dhaka 1212, Bangladesh</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-700">Facebook</a>
                <a href="#" className="text-blue-400 hover:text-blue-500">Twitter</a>
                <a href="#" className="text-pink-600 hover:text-pink-700">Instagram</a>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}