import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const handler = NextAuth(authOptions) as unknown as (req: Request) => Promise<Response>;

export const GET = handler;
export const POST = handler;
