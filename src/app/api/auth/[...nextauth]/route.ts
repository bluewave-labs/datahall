import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const nextAuthHandler = NextAuth(authOptions) as unknown as (req: Request) => Promise<Response>;

export const GET = nextAuthHandler;
export const POST = nextAuthHandler;
