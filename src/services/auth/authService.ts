import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';

import { Auth0Adapter } from './Auth0Adapter';
import type { IAuth } from './IAuth';
import { LocalAuthAdapter } from './LocalAuthAdapter';
import { unifyUserByEmail } from './helpers';

/**
 * Selects the appropriate authentication adapter based on runtime config.
 */
const adapter: IAuth =
	process.env.AUTH_METHOD?.toLowerCase() === 'auth0' ? new Auth0Adapter() : new LocalAuthAdapter();

/**
 * @namespace authService
 * @description Facade exposing adapter methods in a consistent API.
 * @see IAuth
 */
export const authService = {
	/**
	 * @method signUp
	 * @description Register a new user.
	 * @see IAuth.signUp
	 */
	signUp: adapter.signUp.bind(adapter),

	/**
	 * @method forgotPassword
	 * @description Trigger password‑reset flow.
	 * @see IAuth.forgotPassword
	 */
	forgotPassword: adapter.forgotPassword.bind(adapter),

	/**
	 * @method resetPassword
	 * @description Complete password reset (local mode only).
	 * @see IAuth.resetPassword
	 */
	resetPassword: adapter.resetPassword?.bind(adapter),

	/**
	 * @method changePassword
	 * @description Change an authenticated user's password.
	 * @see IAuth.changePassword
	 */
	changePassword: adapter.changePassword.bind(adapter),

	/**
	 * @method changeName
	 * @description Change an authenticated user's name.
	 * @see IAuth.changeName
	 */
	changeName: adapter.changeName.bind(adapter),

	/**
	 * @method verifyUser
	 * @description Verify account via token or userId (local only).
	 * @see IAuth.verifyUser
	 */
	verifyUser: adapter.verifyUser?.bind(adapter),

	/**
	 * @method authenticate
	 * @description Ensure a Next.js API request is authenticated.
	 * Throws if no user session; returns the local user_id.
	 * @throws {Error} "Unauthorized" if session missing.
	 * @returns {Promise<string>} The authenticated user's userId.
	 */
	async authenticate(): Promise<string> {
		const session: Session | null = await getServerSession(authOptions);
		if (!session?.user?.userId) {
			throw new Error('Unauthorized');
		}
		return session.user.userId;
	},
};

/**
 * @exports unifyUserByEmail
 * @description Make or update a local User record from Auth0 metadata.
 * Useful in ROPG sign‑in to sync profiles.
 */
export { unifyUserByEmail };
