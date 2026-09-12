import NextAuth from 'next-auth';
import { authOptions } from '@/features/auth/actions/auth_options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
