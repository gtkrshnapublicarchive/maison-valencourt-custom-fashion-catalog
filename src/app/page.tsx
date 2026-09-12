import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/core/database/prisma';
import { CatalogCard } from '@/features/catalog/components/catalog_card';
import { TextileCard } from '@/features/textiles/components/textile_card';
import { TestimonialCard } from '@/features/testimonials/components/testimonial_card';
import { ArrowRight, Compass, Sparkles, Feather, Scissors } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featuredCreations, featuredFabrics, approvedTestimonials] = await Promise.all([
    prisma.catalogCreation.findMany({
      take: 3,
      include: { fabric: true },
      orderBy: { valuationAurum: 'desc' },
    }),
    prisma.fabric.findMany({
      take: 3,
      include: {
        creations: { select: { id: true, pieceCode: true, title: true } },
      },
      orderBy: { weightGsm: 'desc' },
    }),
    prisma.testimonial.findMany({
      where: { status: 'APPROVED' },
      take: 3,
      orderBy: { reviewedAt: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-600 text-xs font-medium border border-sage-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sartorial Concept Exhibition &bull; Autumn / Winter 2026</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-editorial-text leading-[1.1]">
              The Art of Uncompromising Sartorial Creation
            </h1>

            <p className="text-base sm:text-lg text-editorial-muted max-w-2xl font-light leading-relaxed">
              Maison Valencourt exhibits singular custom garments independently drafted, styled, and hand-canvased by
              our resident master tailors. Fulfilling the highest traditions of bespoke craftsmanship at 14 Rue de
              l&apos;Aube.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center font-medium bg-obsidian text-white h-12 px-7 rounded-xl hover:bg-obsidian-hover transition-colors text-sm tracking-wide"
              >
                Explore Artisan Catalog
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/viewing-inquiry"
                className="inline-flex items-center justify-center font-medium border border-black/10 bg-white text-editorial-text h-12 px-7 rounded-xl hover:bg-black/5 transition-colors text-sm tracking-wide"
              >
                Request Private Salon Viewing
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-md bg-black/5 aspect-[4/5]">
              <Image
                src="/images/atelier_hero_showcase.jpg"
                alt="Maison Valencourt Atelier Showcase, 14 Rue de l'Aube"
                fill
                priority
                sizes="(max-width: 1200px) 50vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-sage-200 font-mono block mb-1">
                  Atelier Showcase &bull; 14 Rue de l&apos;Aube
                </span>
                <h3 className="font-editorial text-xl font-medium">Grand District Salon</h3>
                <p className="text-xs text-white/80 mt-1">
                  Full floating horsehair canvas anatomy &bull; Curated artisan creations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Creations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
              Curated Designer Pieces
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-editorial-text">
              Signature Atelier Concept Creations
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
          >
            View Complete Exhibition &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCreations.map((item) => {
            let imagesList: string[] = [];
            try {
              imagesList = JSON.parse(item.images);
            } catch {
              imagesList = [item.images];
            }
            return (
              <CatalogCard
                key={item.id}
                id={item.id}
                pieceCode={item.pieceCode}
                title={item.title}
                demographic={item.demographic}
                garmentType={item.garmentType}
                leadArtisan={item.leadArtisan}
                valuationAurum={item.valuationAurum}
                availabilityStatus={item.availabilityStatus}
                imageUrl={imagesList[0] || '/images/garments/mvc-2026-j04.jpg'}
                fabricName={item.fabric?.name}
              />
            );
          })}
        </div>
      </section>

      {/* 3. Textile Archive Section */}
      <section className="bg-canvas-subtle py-16 border-y border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
                Textile Provenance
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-editorial-text">
                Rare Weaves &amp; Mill Origins
              </h2>
            </div>
            <Link
              href="/textiles"
              className="text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
            >
              Explore Textile Archive &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFabrics.map((fabric) => (
              <TextileCard
                key={fabric.id}
                id={fabric.id}
                code={fabric.code}
                name={fabric.name}
                millName={fabric.millName}
                composition={fabric.composition}
                weightGsm={fabric.weightGsm}
                season={fabric.season}
                weavePattern={fabric.weavePattern}
                sourcingRationale={fabric.sourcingRationale}
                swatchImageUrl={fabric.swatchImageUrl}
                creationsCount={fabric.creations.length}
                creations={fabric.creations}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Patron Accolades Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-editorial-muted font-medium block mb-2">
              Patron Accolades
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-editorial-text">
              Approved Client Reflections
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="text-xs font-medium text-obsidian underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
          >
            All Patron Testimonials &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approvedTestimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              authorName={t.authorName}
              cityOrRegion={t.cityOrRegion}
              creationReferenced={t.creationReferenced}
              rating={t.rating}
              content={t.content}
              reviewedAt={t.reviewedAt}
            />
          ))}
        </div>
      </section>

      {/* 5. Private Salon Viewing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-obsidian text-white relative overflow-hidden shadow-lg">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-200 font-mono">
              14 Rue de l&apos;Aube, Aurelia City
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-medium text-white leading-tight">
              Experience the Garments in Private Fitting Suite
            </h2>
            <p className="text-sm text-white/75 leading-relaxed font-light">
              We do not operate automated off-the-rack checkouts. Every creation requires private fitting consultation.
              Request an appointment and our salon curator will stage your requested pieces.
            </p>
            <div className="pt-4">
              <Link
                href="/viewing-inquiry"
                className="inline-flex items-center justify-center font-medium bg-white text-obsidian h-12 px-7 rounded-xl hover:bg-sage-100 transition-colors text-sm tracking-wide"
              >
                Schedule Private Salon Viewing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
