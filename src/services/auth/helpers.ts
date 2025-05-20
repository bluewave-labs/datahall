import { randomUUID } from 'crypto';

import prisma from '../../lib/prisma';
import { splitName } from '../../shared/utils';

/**
 * Create or update a local User row keyed by e‑mail and mark it as AUTH0.
 * Used by the ROPG sign‑in flow.
 */
export async function unifyUserByEmail(
	email: string,
	opts?: { fullName?: string; picture?: string },
) {
	const existing = await prisma.user.findUnique({ where: { email } });

	const { first_name, last_name } = splitName(opts?.fullName ?? '');

	if (!existing) {
		return prisma.user.create({
			data: {
				user_id: randomUUID().replace(/-/g, ''),
				email,
				auth_provider: 'AUTH0',
				first_name,
				last_name,
				status: 'ACTIVE',
				password: null,
				avatar_url: opts?.picture ?? null,
				role: 'ADMIN',
			},
		});
	}

	const patch: Record<string, unknown> = {};
	if (existing.auth_provider !== 'AUTH0') patch.auth_provider = 'AUTH0';
	if (existing.status === 'UNVERIFIED') patch.status = 'ACTIVE';
	if (!existing.first_name && first_name) patch.first_name = first_name;
	if (!existing.last_name && last_name) patch.last_name = last_name;
	if (!existing.avatar_url && opts?.picture) patch.avatar_url = opts.picture;

	return Object.keys(patch).length
		? prisma.user.update({ where: { email }, data: patch })
		: existing;
}

/** Helper for mapping common Auth0 API errors to HTTP‑appropriate text */
export function mapAuth0Error(err: any): string {
	switch (err?.error || err?.code) {
		case 'user_exists':
			return 'User already exists';
		case 'invalid_grant':
			return 'Invalid credentials';
		default:
			return err?.error_description || 'Auth0 API error';
	}
}
