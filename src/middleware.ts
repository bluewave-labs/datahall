import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/sign-in', // Redirect to /sign-in for all unauthenticated routes
	},
});

export const config = {
  matcher: [
    '/((?!register|auth/sign-up|auth/forgot-password|auth/account-created|auth/password-reset-confirm|auth/check-email|auth/reset-password|links/[a-f0-9-]{36})/.*.*|auth/reset-password/.*)',
  ],
};
