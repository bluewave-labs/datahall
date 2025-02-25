/**
 * dateUtils.ts
 * ----------------------------------------------------------------------------
 * A collection of utility functions for date/time handling.
 * ----------------------------------------------------------------------------
 * USAGE EXAMPLES:
 *
 * 1) Formatting a date/time:
 *    const dateStr = formatDateTime(new Date(), { includeTime: true, locale: 'en-GB' });
 *    // => e.g. "12 September 2025 10:30"
 *
 * 2) Calculating days until expiration:
 *    const daysLeft = computeExpirationDays("2025-12-01T00:00:00Z");
 *    // => e.g., 280 (if today is February 25, 2025)
 *
 *    const expiredDays = computeExpirationDays("2023-01-01T00:00:00Z");
 *    // => e.g., 0 (if the date has already passed)
 */

// ----------------------------------------------------------------------------
// DATE/TIME UTILITIES
// ----------------------------------------------------------------------------

export interface FormatDateTimeOptions {
	/**
	 * Whether to include time (HH:MM) in the output. Defaults to false.
	 */
	includeTime?: boolean;
	/**
	 * The locale for date/time formatting (e.g. 'en-US', 'fr-FR'). Defaults to 'en-US'.
	 */
	locale?: string;
	/**
	 * A time zone identifier (e.g. 'UTC', 'America/Los_Angeles'). If omitted,
	 * it uses the system default.
	 */
	timeZone?: string;
}

/**
 * formatDateTime
 * ----------------------------------------------------------------------------
 * Format a Date or date string into a human-readable format.
 *
 * @param date    The date object or string to format.
 * @param options Optional formatting config, e.g. { includeTime: true, locale: 'en-GB', timeZone: 'UTC' }
 * @returns A formatted date/time string, locale-aware.
 */
export function formatDateTime(
	date: string | Date,
	{ includeTime, locale = 'en-US', timeZone }: FormatDateTimeOptions = {},
): string {
	const parsedDate = typeof date === 'string' ? new Date(date) : date;

	const dateFormat: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...(timeZone ? { timeZone } : {}),
	};

	const timeFormat: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		...(timeZone ? { timeZone } : {}),
	};

	// Build up the date string
	let datePart = new Intl.DateTimeFormat(locale, dateFormat).format(parsedDate);

	if (includeTime) {
		const timePart = new Intl.DateTimeFormat(locale, timeFormat).format(parsedDate);
		datePart += ` ${timePart}`;
	}

	return datePart;
}

/**
 * computeExpirationDays
 * ----------------------------------------------------------------------------
 * Calculates how many whole days between `expirationTime` and now.
 *
 * @param expirationTime - A date string in ISO format (e.g., "2025-12-01T00:00:00Z")
 * @returns Number of days (rounded up)
 */
export function computeExpirationDays(expirationTime: string): number {
	if (!expirationTime) return 0;
	const expirationDate = new Date(expirationTime);
	const now = new Date();
	const diffTime = Math.abs(expirationDate.getTime() - now.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
