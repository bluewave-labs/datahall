// THIS IS NOT FUNCTIONAL YET, JUST A TEMPLATE

/**
 * A list of public route patterns, expressed as regex strings.
 *
 * Explanation:
 *  - '^auth/sign-up$' means exactly "/auth/sign-up".
 *    (We remove the leading slash when matching, see isPublicRoute below.)
 *  - '^auth/reset-password/.+' means any path that starts with /auth/reset-password/
 *    and then has additional segments.
 *  - '^links/[a-f0-9-]{36}' matches "/links/uuid" where uuid is a 36-char hex string.
 */
const PUBLIC_ROUTE_PATTERNS = [
	'^auth/sign-up$',
	'^auth/forgot-password$',
	'^auth/reset-password$',
	'^auth/account-created$',
	'^auth/password-reset-confirm$',
	'^auth/check-email$',
	'^links/[a-f0-9-]{36}', // dynamic link route
	'^auth/reset-password/.+', // dynamic reset-password route
];

/**
 * Checks if a given pathname is public by testing against the regex patterns.
 *
 * @param pathname - the current route path (e.g. "/auth/sign-up" or "/documents/123").
 */
export function isPublicRoute(pathname: string): boolean {
	// Remove leading slash (e.g. "/auth/sign-up" => "auth/sign-up")
	const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;

	return PUBLIC_ROUTE_PATTERNS.some((pattern) => {
		const regex = new RegExp(pattern, 'i'); // 'i' = case-insensitive
		return regex.test(path);
	});
}

/**
 * Generates one big negative-lookahead pattern for NextAuth middleware.
 *
 * For example, if PUBLIC_ROUTE_PATTERNS = ["^auth/sign-up$", "^links/[a-f0-9-]{36}"],
 * we'll produce something like:
 *    ^/(?!(auth/sign-up$|links/[a-f0-9-]{36})).*
 *
 * This means: "Match anything that does NOT start with one of these patterns."
 */
export const NEGATIVE_LOOKAHEAD_REGEX = `^/(?!(${PUBLIC_ROUTE_PATTERNS.join('|')})).*`;
