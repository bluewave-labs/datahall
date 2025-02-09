// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			userId: string;
			role: string;
			firstName: string;
			lastName: string;
			email: string;
			image?: string;
		};
	}

	interface User {
		id: string;
		userId: string;
		role: string;
		firstName: string;
		lastName: string;
	}
}
