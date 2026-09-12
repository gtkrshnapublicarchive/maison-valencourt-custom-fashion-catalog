'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';

export function PatronLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/patron/wishlist';

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
        setError(res.error);
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-md w-full mx-auto shadow-sm">
      <div className="text-center mb-6">
        <h2 className="font-editorial text-2xl font-medium text-editorial-text">Patron Sign In</h2>
        <p className="text-xs text-editorial-muted mt-1.5">
          Access your personal Wishlist Vault and submit atelier accolades
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="patron@valencourt.atelier"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button type="submit" variant="default" className="w-full mt-2" isLoading={isLoading}>
          Enter Patron Vault
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-black/5 text-center text-xs text-editorial-muted">
        <p>
          First time visiting our digital showcase?{' '}
          <Link
            href={`/patron/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
            className="font-medium text-obsidian underline underline-offset-2"
          >
            Register as Patron
          </Link>
        </p>
      </div>
    </Card>
  );
}
