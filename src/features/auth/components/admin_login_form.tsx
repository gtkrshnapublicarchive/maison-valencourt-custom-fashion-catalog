'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';
import { ShieldAlert } from 'lucide-react';

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Authentication rejected. Verify administrator credentials.');
        setIsLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred during administrative authentication.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-md w-full mx-auto shadow-sm border-obsidian/20">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 rounded-2xl bg-obsidian text-white mb-3">
          <ShieldAlert className="w-6 h-6 text-sage-200" />
        </div>
        <h2 className="font-editorial text-2xl font-medium text-editorial-text">Atelier Director Access</h2>
        <p className="text-xs text-editorial-muted mt-1.5">
          Restricted administrative console for catalog curation and testimonial moderation (ACC)
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Director Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="director@valencourt.atelier"
          required
        />
        <Input
          label="Security Passphrase"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button type="submit" variant="default" className="w-full mt-2" isLoading={isLoading}>
          Authorize Administrative Session
        </Button>
      </form>
    </Card>
  );
}
