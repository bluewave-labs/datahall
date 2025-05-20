let cache: { token: string; exp: number } | null = null;

const REFRESH_THRESHOLD = 60; // seconds before expiry to refresh

export async function getMgmtToken(): Promise<string> {
	const now = Math.floor(Date.now() / 1000);

	if (cache?.token && cache.exp - now > REFRESH_THRESHOLD) {
		return cache.token;
	}

	const res = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			grant_type: 'client_credentials',
			client_id: process.env.AUTH0_M2M_CLIENT_ID,
			client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
			audience: process.env.AUTH0_MGMT_AUDIENCE,
			realm: process.env.AUTH0_DB_CONNECTION,
		}),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(`Auth0 mgmt‑token error: ${data.error}`);

	cache = { token: data.access_token, exp: now + data.expires_in };
	return cache.token;
}
