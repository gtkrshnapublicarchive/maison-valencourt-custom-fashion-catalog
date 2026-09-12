import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/core/database/prisma';
import { verifyPassword } from '@/core/security/password';
import { checkRateLimit } from '@/core/security/rate_limiter';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 12 * 60 * 60, // 12 hours
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const ip = (req?.headers?.['x-forwarded-for'] as string) || '127.0.0.1';
        const rateCheck = checkRateLimit({
          key: `login-attempt:${ip}:${credentials.email.toLowerCase()}`,
          limit: 5,
          windowMs: 15 * 60 * 1000,
        });

        if (!rateCheck.success) {
          throw new Error('Too many login attempts. Please wait 15 minutes before trying again.');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isValid = await verifyPassword(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          cityOrRegion: user.cityOrRegion,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.cityOrRegion = user.cityOrRegion;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'PATRON' | 'ADMIN';
        session.user.cityOrRegion = token.cityOrRegion as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/patron/login',
    error: '/patron/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'maison-valencourt-dev-secret-key-32chars-min',
};
