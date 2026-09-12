import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'PATRON' | 'ADMIN';
      cityOrRegion?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: 'PATRON' | 'ADMIN';
    cityOrRegion?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'PATRON' | 'ADMIN';
    cityOrRegion?: string | null;
  }
}
