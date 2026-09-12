'use client';

import React, { useState } from 'react';
import { Card } from '@/core/ui/card';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';
import { changePasswordAction } from '@/features/profile/actions/change_password.action';
import { KeyRound, CheckCircle2 } from 'lucide-react';

export interface SecurityPasswordCardProps {
  role: 'ADMIN' | 'PATRON';
}

export function SecurityPasswordCard({ role }: SecurityPasswordCardProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDirector = role === 'ADMIN';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setIsLoading(true);

    const res = await changePasswordAction({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError(res.error || 'Failed to update password.');
    }
  };

  return (
    <Card className="p-6 sm:p-8 border border-black/10">
      <div className="flex items-center gap-2.5 mb-6">
        <KeyRound className="w-5 h-5 text-sage-600" />
        <div>
          <h3 className="font-editorial text-xl font-medium text-editorial-text">
            {isDirector ? 'Administrative Security Passphrase' : 'Patron Vault Access Credentials'}
          </h3>
          <p className="text-xs text-editorial-muted mt-0.5">
            {isDirector
              ? 'Update root executive authorization passphrase (minimum 8 characters, letter and number)'
              : 'Modify your confidential access code for the personal wishlist vault and accolades'}
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-5 p-3.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
          <span>Security credentials successfully rotated and encrypted with bcrypt-12.</span>
        </div>
      )}

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={isDirector ? 'Current Administrative Passphrase' : 'Current Password'}
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={isDirector ? 'New Administrative Passphrase' : 'New Password'}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            hint="Min. 8 characters, 1 letter, 1 number"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="default" isLoading={isLoading} className="w-full sm:w-auto">
            {isDirector ? 'Rotate Director Passphrase' : 'Update Password'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
