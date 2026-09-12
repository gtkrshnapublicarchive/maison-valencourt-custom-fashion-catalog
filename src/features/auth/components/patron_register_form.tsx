'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { Card } from '@/core/ui/card';
import { registerPatronAction } from '@/features/auth/actions/register_patron.action';

export function PatronRegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cityOrRegion, setCityOrRegion] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await registerPatronAction({
      name,
      email,
      cityOrRegion,
      password,
    });

    if (!res.success) {
      setError(res.error || 'Failed to register');
      setIsLoading(false);
      return;
    }

    // Auto sign in upon successful registration
    const loginRes = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (loginRes?.error) {
      router.push('/patron/login?registered=true');
    } else {
      router.push('/patron/wishlist');
      router.refresh();
    }
  };

  return (
    <Card className="p-8 max-w-md w-full mx-auto shadow-sm">
      <div className="text-center mb-6">
        <h2 className="font-editorial text-2xl font-medium text-editorial-text">Patron Registration</h2>
        <p className="text-xs text-editorial-muted mt-1.5">
          Establish an authenticated patron profile for Wishlist Vault and testimonials
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Julian Sterling"
          required
        />
        <Input
          label="City / District"
          type="text"
          value={cityOrRegion}
          onChange={(e) => setCityOrRegion(e.target.value)}
          placeholder="e.g. Grand District, Aurelia"
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="patron@valencourt.atelier"
          required
        />
        <Input
          label="Password (min 8 chars, 1 letter, 1 number)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <Button type="submit" variant="default" className="w-full mt-2" isLoading={isLoading}>
          Create Patron Profile
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-black/5 text-center text-xs text-editorial-muted">
        <p>
          Already an authenticated patron?{' '}
          <Link href="/patron/login" className="font-medium text-obsidian underline underline-offset-2">
            Sign in here
          </Link>
        </p>
      </div>
    </Card>
  );
}
