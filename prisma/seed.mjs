import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[*] Seeding Maison Valencourt Atelier database...');

  // 1. Seed Fabrics
  const fabric1 = await prisma.fabric.upsert({
    where: { code: 'TX-VAL-01' },
    update: {
      swatchImageUrl: '/images/textiles/tx-val-01.jpg',
    },
    create: {
      code: 'TX-VAL-01',
      name: 'Super 150s Imperial Worsted Wool',
      millName: 'Mill of Valois',
      composition: '95% Super 150s Merino Wool, 5% Mulberry Silk',
      weightGsm: 280,
      season: 'Four Seasons',
      weavePattern: 'Subtle Herringbone',
      sourcingRationale:
        'Sourced from the historic Valois mill, prized for its supple hand, natural crease resistance, and rich midnight lustre under salon lighting.',
      swatchImageUrl: '/images/textiles/tx-val-01.jpg',
    },
  });

  const fabric2 = await prisma.fabric.upsert({
    where: { code: 'TX-VAL-02' },
    update: {
      swatchImageUrl: '/images/textiles/tx-val-02.jpg',
    },
    create: {
      code: 'TX-VAL-02',
      name: 'Aurelian Cloud Cashmere Flannel',
      millName: 'Aurelian Highlands Mill',
      composition: '100% Uncarded Highland Cashmere',
      weightGsm: 340,
      season: 'Autumn / Winter',
      weavePattern: 'Brushed Twill',
      sourcingRationale:
        'Harvested exclusively from mountain combs, offering exceptional thermal insulation with a feather-weight drape suitable for soft-tailored outerwear.',
      swatchImageUrl: '/images/textiles/tx-val-02.jpg',
    },
  });

  const fabric3 = await prisma.fabric.upsert({
    where: { code: 'TX-VAL-03' },
    update: {
      swatchImageUrl: '/images/textiles/tx-val-03.jpg',
    },
    create: {
      code: 'TX-VAL-03',
      name: 'Vintage Irish Deadstock Heavy Linen',
      millName: 'Belfast Heritage Weavers',
      composition: '100% Wet-Spun Flax',
      weightGsm: 380,
      season: 'Spring / Summer',
      weavePattern: 'Rustic Plain Weave',
      sourcingRationale:
        'Salvaged archive bolts from 1974. Possesses a crisp structural backbone that softens gracefully with each salon fitting and wear.',
      swatchImageUrl: '/images/textiles/tx-val-03.jpg',
    },
  });

  const fabric4 = await prisma.fabric.upsert({
    where: { code: 'TX-VAL-04' },
    update: {
      swatchImageUrl: '/images/textiles/tx-val-04.jpg',
    },
    create: {
      code: 'TX-VAL-04',
      name: 'Silk-Velvet Noir Brocade',
      millName: 'Lyon Renaissance Weavers',
      composition: '70% Silk Velvet, 30% Metallic Thread',
      weightGsm: 310,
      season: 'Evening Formal',
      weavePattern: 'Jacquard Brocade',
      sourcingRationale:
        'Woven on restored 19th-century mechanical jacquard looms, creating deep light absorption and tactile contrast for formal wear.',
      swatchImageUrl: '/images/textiles/tx-val-04.jpg',
    },
  });

  // 2. Seed Catalog Creations
  const creation1Images = JSON.stringify([
    '/images/garments/mvc-2026-j04.jpg',
    '/images/textiles/tx-val-01.jpg',
  ]);
  const creation1 = await prisma.catalogCreation.upsert({
    where: { pieceCode: 'MVC-2026-J04' },
    update: {
      images: creation1Images,
    },
    create: {
      pieceCode: 'MVC-2026-J04',
      title: 'Double-Breasted Silk-Wool Peaked Coat',
      demographic: 'Gentlemen',
      garmentType: 'Overcoats',
      collectionTheme: 'Atelier Heritage Series',
      leadArtisan: 'Master Tailor Mateo Rossi',
      conceptStory:
        'A structural exploration of mid-century architectural silhouettes. Master Tailor Rossi balanced sweeping 12cm peaked lapels with an unpadded shoulder expression, achieving commanding grandeur without rigid shoulder pads.',
      constructionType: 'Full Floating Horsehair Canvas',
      lapelStyle: '12cm Dramatic Peaked Lapel with Silk Grosgrain Facing',
      ventStyle: 'Deep Central Inverted Pleat',
      handStitchingNotes: '42 hours of hand-canvasing; Milanese boutonnière stitched by hand in silk twist thread.',
      measurements: 'Chest: 40R | Shoulder: 18.2" | Sleeve: 25.5" | Back Length: 41.0"',
      valuationAurum: 2450,
      availabilityStatus: 'AVAILABLE',
      images: creation1Images,
      fabricId: fabric1.id,
    },
  });

  const creation2Images = JSON.stringify([
    '/images/garments/mvc-2026-t02.jpg',
    '/images/textiles/tx-val-02.jpg',
  ]);
  const creation2 = await prisma.catalogCreation.upsert({
    where: { pieceCode: 'MVC-2026-T02' },
    update: {
      images: creation2Images,
    },
    create: {
      pieceCode: 'MVC-2026-T02',
      title: 'Sculpted Neapolitan Flannel Blazer',
      demographic: 'Universal / Fluid',
      garmentType: 'Tailored Jackets',
      collectionTheme: 'Architectural Minimalist',
      leadArtisan: 'Resident Tailor Claire Laurent',
      conceptStory:
        'Conceived as an effortless drape study for Aurelia City autumn evenings. Laurent incorporated spalla camicia shirt-sleeve construction and curved barchetta chest pockets.',
      constructionType: 'Unstructured Neapolitan Spalla Camicia',
      lapelStyle: '9.5cm Stepped Notch Lapel with Hand-Pick Stitching',
      ventStyle: 'Double Side Vents (28cm depth)',
      handStitchingNotes: 'Continuous 2mm AMF pick stitching along lapels, pockets, and quarters; vintage horn buttons.',
      measurements: 'Chest: 38R | Shoulder: 17.5" | Sleeve: 25.0" | Back Length: 29.5"',
      valuationAurum: 1850,
      availabilityStatus: 'AVAILABLE',
      images: creation2Images,
      fabricId: fabric2.id,
    },
  });

  const creation3Images = JSON.stringify([
    '/images/garments/mvc-2026-x01.jpg',
    '/images/textiles/tx-val-04.jpg',
  ]);
  const creation3 = await prisma.catalogCreation.upsert({
    where: { pieceCode: 'MVC-2026-X01' },
    update: {
      images: creation3Images,
    },
    create: {
      pieceCode: 'MVC-2026-X01',
      title: 'Midnight Solstice Dinner Jacket',
      demographic: 'Gentlemen',
      garmentType: 'Tuxedos / Formalwear',
      collectionTheme: 'Midnight Formal',
      leadArtisan: 'Lead Artisan Henri Valencourt',
      conceptStory:
        'Crafted for formal salon galas. Henri Valencourt paired jet-black Lyon silk velvet with high-twist wool trousers, establishing a timeless aura of sartorial luxury.',
      constructionType: 'Full Floating Horsehair Canvas with Silk Lapel Facing',
      lapelStyle: 'Classic Rounded Shawl Collar in Pure Silk Satin',
      ventStyle: 'No Vent (Sartorial Formal Standard)',
      handStitchingNotes: 'Hand-sewn armholes with silk basting, hand-rolled hem, and mother-of-pearl stud closures.',
      measurements: 'Chest: 42R | Shoulder: 18.8" | Sleeve: 26.0" | Back Length: 30.5"',
      valuationAurum: 3100,
      availabilityStatus: 'RESERVED',
      images: creation3Images,
      fabricId: fabric4.id,
    },
  });

  const creation4Images = JSON.stringify([
    '/images/garments/mvc-2026-w08.jpg',
    '/images/textiles/tx-val-01.jpg',
  ]);
  const creation4 = await prisma.catalogCreation.upsert({
    where: { pieceCode: 'MVC-2026-W08' },
    update: {
      images: creation4Images,
    },
    create: {
      pieceCode: 'MVC-2026-W08',
      title: 'Structured Hourglass Tailored Jacket',
      demographic: 'Ladies',
      garmentType: 'Tailored Jackets',
      collectionTheme: 'Atelier Heritage Series',
      leadArtisan: 'Stylist & Tailor Eleni Vane',
      conceptStory:
        'A celebration of couture volume. Vane drafted an exaggerated cinched waist paired with soft architectural hip peplums, finished with hand-rolled silk lapels.',
      constructionType: 'Semi-Canvas with Floating Chest Felt',
      lapelStyle: 'High-Gorge Peaked Lapel',
      ventStyle: 'Dual Back Pleats',
      handStitchingNotes: 'Interior waist stay hand-stitched with silk ribbons; hand-bound buttonholes.',
      measurements: 'Bust: 36" | Waist: 28" | Hip: 38" | Shoulder: 16.0" | Back Length: 26.5"',
      valuationAurum: 2200,
      availabilityStatus: 'AVAILABLE',
      images: creation4Images,
      fabricId: fabric1.id,
    },
  });

  const creation5Images = JSON.stringify([
    '/images/garments/mvc-2026-y03.jpg',
    '/images/textiles/tx-val-03.jpg',
  ]);
  const creation5 = await prisma.catalogCreation.upsert({
    where: { pieceCode: 'MVC-2026-Y03' },
    update: {
      images: creation5Images,
    },
    create: {
      pieceCode: 'MVC-2026-Y03',
      title: 'Youth Sartorial Debut Waistcoat Ensemble',
      demographic: 'Youth / Debut',
      garmentType: 'Waistcoats',
      collectionTheme: 'Architectural Minimalist',
      leadArtisan: 'Master Tailor Mateo Rossi',
      conceptStory:
        'Designed as an introduction to authentic tailoring for emerging patrons. Rossi engineered a high-armhole cut with adjustable cinch tabs to ensure longevity across seasonal fittings.',
      constructionType: 'Soft Floating Chest Canvas',
      lapelStyle: 'Horseshoe Lapel with Silk Piping',
      ventStyle: 'Double Pointed Waistcoat Hem',
      handStitchingNotes: 'Fine pick stitching along neckline; hand-sewn bone buttons.',
      measurements: 'Chest: 34S | Waist: 28" | Back Length: 22.0"',
      valuationAurum: 950,
      availabilityStatus: 'AVAILABLE',
      images: creation5Images,
      fabricId: fabric3.id,
    },
  });

  const creation6Images = JSON.stringify([
    '/images/garments/mvc-2026-m05.jpg',
    '/images/textiles/tx-val-02.jpg',
  ]);
  const creation6 = await prisma.catalogCreation.upsert({
    where: { pieceCode: 'MVC-2026-M05' },
    update: {
      images: creation6Images,
    },
    create: {
      pieceCode: 'MVC-2026-M05',
      title: 'Mature Classical Donegal Tweed Overcoat',
      demographic: 'Mature / Classical',
      garmentType: 'Overcoats',
      collectionTheme: 'Autumn Tweed Expedition',
      leadArtisan: 'Lead Artisan Henri Valencourt',
      conceptStory:
        'Rooted in enduring classical proportions. Generous chest drape, roped shoulder heads, and deep storm collar for uncompromising warmth and distinguished presence.',
      constructionType: 'Full Floating Horsehair Canvas with Wool Batt Interlining',
      lapelStyle: 'Ulster Collar with Throat Latch',
      ventStyle: 'Full Inverted Walking Pleat',
      handStitchingNotes: 'Horn buttons backed with interior anchoring buttons; heavy silk chain hanger.',
      measurements: 'Chest: 44R | Shoulder: 19.5" | Sleeve: 26.5" | Back Length: 43.5"',
      valuationAurum: 2750,
      availabilityStatus: 'AVAILABLE',
      images: creation6Images,
      fabricId: fabric2.id,
    },
  });

  // 3. Seed Users (Admin & Patrons)
  const adminPassword = await bcrypt.hash('ValencourtAtelier2026!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'director@valencourt.atelier' },
    update: {},
    create: {
      email: 'director@valencourt.atelier',
      passwordHash: adminPassword,
      name: 'Marcus Valencourt',
      role: 'ADMIN',
      cityOrRegion: 'Grand District, Aurelia',
    },
  });

  // Rename any legacy @aurum.client emails if present
  await prisma.user.updateMany({
    where: { email: 'helena.vance@aurum.client' },
    data: { email: 'helena.vance@valencourt.patron' },
  });
  await prisma.user.updateMany({
    where: { email: 'julian.sterling@aurum.client' },
    data: { email: 'julian.sterling@valencourt.patron' },
  });

  const patron1Password = await bcrypt.hash('PatronVance2026!', 12);
  const patron1 = await prisma.user.upsert({
    where: { email: 'helena.vance@valencourt.patron' },
    update: {
      email: 'helena.vance@valencourt.patron',
    },
    create: {
      email: 'helena.vance@valencourt.patron',
      passwordHash: patron1Password,
      name: 'Helena Vance',
      role: 'PATRON',
      cityOrRegion: 'Upper Promenade, Aurelia',
    },
  });

  const patron2Password = await bcrypt.hash('PatronJulian2026!', 12);
  const patron2 = await prisma.user.upsert({
    where: { email: 'julian.sterling@valencourt.patron' },
    update: {
      email: 'julian.sterling@valencourt.patron',
    },
    create: {
      email: 'julian.sterling@valencourt.patron',
      passwordHash: patron2Password,
      name: 'Julian Sterling',
      role: 'PATRON',
      cityOrRegion: 'Arts District, Aurelia',
    },
  });

  // 4. Seed Wishlist Items
  await prisma.wishlistItem.upsert({
    where: {
      patronId_creationId: {
        patronId: patron1.id,
        creationId: creation1.id,
      },
    },
    update: {},
    create: {
      patronId: patron1.id,
      creationId: creation1.id,
    },
  });

  await prisma.wishlistItem.upsert({
    where: {
      patronId_creationId: {
        patronId: patron2.id,
        creationId: creation2.id,
      },
    },
    update: {},
    create: {
      patronId: patron2.id,
      creationId: creation2.id,
    },
  });

  // 5. Seed Testimonials (Approved & Pending)
  await prisma.testimonial.createMany({
    data: [
      {
        patronId: patron1.id,
        authorName: 'Helena Vance',
        cityOrRegion: 'Upper Promenade, Aurelia',
        creationReferenced: 'MVC-2026-X01: Midnight Solstice Dinner Jacket',
        rating: 5,
        content:
          'The floating canvas structure is unlike anything off-the-rack. Trying this on in Private Fitting Suite B was an unforgettable salon experience. Master Valencourt personally adjusted the lapel drape during my visit.',
        status: 'APPROVED',
        reviewedAt: new Date(Date.now() - 86400000 * 2),
        reviewedById: admin.id,
      },
      {
        patronId: patron2.id,
        authorName: 'Julian Sterling',
        cityOrRegion: 'Arts District, Aurelia',
        creationReferenced: 'MVC-2026-T02: Sculpted Neapolitan Flannel Blazer',
        rating: 5,
        content:
          'The spalla camicia shoulder expression is pure poetry. Lightweight yet wonderfully architectural. This catalog allowed me to appreciate the hand-canvasing before stepping into the atelier.',
        status: 'APPROVED',
        reviewedAt: new Date(Date.now() - 86400000 * 5),
        reviewedById: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('[OK] Database seeded with artisan creations, fabrics, users, wishlists, and approved testimonials.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
