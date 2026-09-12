import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
import { AuthSessionProvider } from '@/core/layout/session_provider';
import { AtelierBanner } from '@/core/layout/atelier_banner';
import { Navbar } from '@/core/layout/navbar';
import { Footer } from '@/core/layout/footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maison Valencourt | Artisan Fashion & Tailoring Showcase',
  description:
    'Dedicated digital showcase catalog for Maison Valencourt Atelier at 14 Rue de l’Aube. Curated designer garments, textile archive, and salon viewing inquiries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-canvas text-editorial-text selection:bg-sage-200 selection:text-obsidian">
        <AuthSessionProvider>
          <AtelierBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
