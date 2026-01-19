// components/admin/ContentEditor.tsx
'use client';
import { useState } from 'react';
import { Input } from '@/app/components/shared/Input';
import { Button } from '@/app/components/shared/Button';

export default function ContentEditor() {
  const [content, setContent] = useState({
    heroTitle: 'Give Hope, Change Lives',
    heroSubtitle: 'Support orphaned children in Bangladesh',
  });

  const handleSave = () => {
    alert('Content saved! (This will connect to backend)');
  };

  return (
    <div className="space-y-6">
      <Input
        label="Hero Title"
        value={content.heroTitle}
        onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
      />
      <Input
        label="Hero Subtitle"
        value={content.heroSubtitle}
        onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
      />
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  );
}
