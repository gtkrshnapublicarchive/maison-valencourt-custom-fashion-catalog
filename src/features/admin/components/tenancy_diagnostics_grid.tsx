import React from 'react';
import { Card } from '@/core/ui/card';
import { Shield, Clock, MapPin, Database } from 'lucide-react';

export function TenancyDiagnosticsGrid() {
  return (
    <div className="space-y-4">
      <div className="border-b border-black/5 pb-2">
        <h3 className="font-editorial text-xl font-medium text-editorial-text">
          Atelier Tenancy &amp; Operational Diagnostics
        </h3>
        <p className="text-xs text-editorial-muted mt-0.5">
          Sovereign architectural parameters governing Maison Valencourt Atelier at 14 Rue de l&apos;Aube.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border border-black/10">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-editorial-text mb-4">
            <MapPin className="w-4 h-4 text-sage-600" />
            <span>Single-Tenant Tenancy Model</span>
          </div>
          <dl className="text-xs space-y-2 text-editorial-muted">
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Atelier Location</span>
              <span className="font-medium text-editorial-text">14 Rue de l&apos;Aube, Aurelia City</span>
            </div>
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Currency Architecture</span>
              <span className="font-medium text-editorial-text">Aurum (AUR)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Private Fitting Suites</span>
              <span className="font-medium text-editorial-text">Suite A, Suite B</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Resident Master Tailors</span>
              <span className="font-medium text-editorial-text">Mateo Rossi, Claire Laurent, Henri Valencourt</span>
            </div>
          </dl>
        </Card>

        <Card className="p-6 border border-black/10">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-editorial-text mb-4">
            <Clock className="w-4 h-4 text-sage-600" />
            <span>Salon Operating Hours</span>
          </div>
          <dl className="text-xs space-y-2 text-editorial-muted">
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Tuesday &ndash; Saturday</span>
              <span className="font-medium text-editorial-text">10:00 &ndash; 19:00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Sunday &amp; Monday</span>
              <span className="font-medium text-amber-800">Closed (Drafting &amp; Cutting)</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Appointment Lead Time</span>
              <span className="font-medium text-editorial-text">24 Hours Minimum</span>
            </div>
          </dl>
        </Card>

        <Card className="p-6 border border-black/10">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-editorial-text mb-4">
            <Shield className="w-4 h-4 text-sage-600" />
            <span>Sovereign Security Primitives</span>
          </div>
          <ul className="text-xs space-y-2 text-editorial-muted">
            <li className="flex items-center justify-between py-1 border-b border-black/5">
              <span>Third-Party Cloud Captchas</span>
              <span className="font-mono text-sage-600 font-medium">STRICTLY BANNED (0 Vendors)</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-black/5">
              <span>Anti-Bot Shield</span>
              <span className="font-medium text-editorial-text">Patron Auth + Native Rate Limiter</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-black/5">
              <span>Review Frequency Cap</span>
              <span className="font-medium text-editorial-text">1 Submission / 30 Days</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span>Password Hashing</span>
              <span className="font-mono text-editorial-text">bcrypt (Work Factor 12)</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border border-black/10">
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-editorial-text mb-4">
            <Database className="w-4 h-4 text-sage-600" />
            <span>Persistence &amp; Engine</span>
          </div>
          <dl className="text-xs space-y-2 text-editorial-muted">
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Application Framework</span>
              <span className="font-medium text-editorial-text">Next.js 16.3 (App Router)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Database Engine</span>
              <span className="font-medium text-editorial-text">PostgreSQL 16 Alpine</span>
            </div>
            <div className="flex justify-between py-1 border-b border-black/5">
              <span>Data Layer ORM</span>
              <span className="font-medium text-editorial-text">Prisma ORM 6.4</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Aesthetics Engine</span>
              <span className="font-medium text-editorial-text">Warm Editorial Light</span>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
