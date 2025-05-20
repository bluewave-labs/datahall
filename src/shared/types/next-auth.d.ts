import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		id: string;
		userId: string;
		role: string; // 'ADMIN' | 'USER'
		firstName: string;
		lastName: string;
		email: string;
		authProvider: 'CREDENTIALS' | 'AUTH0' | 'GOOGLE';
		avatarUrl?: string;
		status?: 'ACTIVE' | 'ARCHIVED' | 'UNVERIFIED';
	}

	interface Session {
		user: User;
	}
}
