/* -------------------------------------------------------------------------- */
/*  src/hooks/auth/useAuthQueryToasts.ts                                      */
/* -------------------------------------------------------------------------- */
'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks';

/**
 * Reads the query-string set by our auth API routes and surfaces one-shot
 * toasts on the **sign-in page**.
 *
 * Supported flags:
 *   ?verified=true        – e-mail address is now verified
 *   ?reset=sent           – password-reset link has been e-mailed
 *   ?emailSent=true       – verification e-mail sent after sign-up
 *   ?error=<msg>          – backend-supplied error string (URL-encoded)
 *
 * Call it once in ** /auth/sign-in/page.tsx **. On any other route it is a no-op.
 */
export default function useAuthQueryToasts() {
	const search = useSearchParams();
	const toast = useToast();
	const router = useRouter();
	const hasRun = useRef(false);

	useEffect(() => {
		if (!search || hasRun.current) return;

		const didShowToast =
			search.get('verified') === 'true' ||
			search.get('reset') === 'sent' ||
			search.get('reset') === 'done' ||
			search.get('emailSent') === 'true' ||
			search.has('error');

		/* ---------- success flags ---------- */
		if (search.get('verified') === 'true') {
			toast.showToast({
				message: 'Email verified - you can now sign in.',
				variant: 'success',
			});
		}

		if (search.get('reset') === 'sent') {
			toast.showToast({
				message: 'Password-reset link sent.',
				variant: 'success',
			});
		}

		if (search.get('reset') === 'done') {
			toast.showToast({
				message: 'Password changed - please sign in.',
				variant: 'success',
			});
		}

		if (search.get('emailSent') === 'true') {
			toast.showToast({
				message: 'Verification e-mail sent. Please check your inbox.',
				variant: 'success',
			});
		}

		/* ---------- error flag (last wins) ---------- */
		if (search.has('error')) {
			toast.showToast({
				message: decodeURIComponent(search.get('error') ?? 'Authentication error'),
				variant: 'error',
			});
		}
		/* ----- clean URL  ---------------------------------------------------- */
		if (didShowToast) {
			hasRun.current = true;
			router.replace('/auth/sign-in', { scroll: false });
		}
	}, [search, router, toast]);
}
