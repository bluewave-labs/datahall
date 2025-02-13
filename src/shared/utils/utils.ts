/**
 * utils.ts
 * ----------------------------------------------------------------------------
 * A collection of utility functions for file sizes and date/time handling.
 * ----------------------------------------------------------------------------
 * USAGE EXAMPLES:
 *
 * 1) Formatting a file size:
 *    const sizeText = formatFileSize(123456);
 *    // => e.g., "120.56 KB"
 *
 *    // With options:
 *    const sizeText2 = formatFileSize(5_123_456, { decimals: 3, maxUnit: 'GB', locale: 'fr-FR' });
 *    // => e.g., "4,88 MB"
 *
 * 2) Parsing a file size:
 *    const bytes = parseFileSize("2 MB");
 *    // => 2097152
 *
 * 3) Formatting a date/time:
 *    const dateStr = formatDateTime(new Date(), { includeTime: true, locale: 'en-GB' });
 *    // => e.g. "12 September 2025 10:30"
 */

// ----------------------------------------------------------------------------
// FILE SIZE UTILITIES
// ----------------------------------------------------------------------------

export interface FormatFileSizeOptions {
	/**
	 * Number of decimal places in the output. Defaults to 2.
	 */
	decimals?: number;
	/**
	 * If provided, clamp the maximum unit to this level (Bytes, KB, MB, GB, TB, PB).
	 */
	maxUnit?: 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
	/**
	 * Locale for number formatting. Defaults to 'en-US'.
	 */
	locale?: string;
}

/**
 * Convert a numeric byte size into a human-readable string (e.g. "12.34 MB").
 *
 * @param bytes     The file size in bytes.
 * @param options   Optional formatting constraints, e.g. decimals, maxUnit, locale.
 * @returns A human-friendly string representation of the file size.
 */
export function formatFileSize(
	bytes: number = 0,
	{ decimals = 2, maxUnit, locale = 'en-US' }: FormatFileSizeOptions = {},
): string {
	if (bytes <= 0) return '0 Bytes';

	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	let unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));

	// If user specified a maxUnit, clamp the index
	if (maxUnit) {
		const maxIndex = units.indexOf(maxUnit);
		if (maxIndex >= 0) {
			unitIndex = Math.min(unitIndex, maxIndex);
		}
	}

	const value = bytes / Math.pow(1024, unitIndex);

	// Use Intl for locale-aware formatting
	const formatter = new Intl.NumberFormat(locale, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	return `${formatter.format(value)} ${units[unitIndex]}`;
}

/**
 * Parses a string like "20 KB" or "5.3 MB" into a numeric size in bytes.
 *
 * @param sizeString   The file size string, e.g. "2 MB", "1.5 GB", "4096 Bytes"
 * @param throwOnError Whether to throw an Error on invalid input (true by default).
 * @returns The numeric size in bytes (NaN or 0 if you choose not to throw on error).
 */
export function parseFileSize(sizeString: string, throwOnError = true): number {
	// Expand the regex to allow variations like "B" => "BYTES"
	const regex = /([\d.]+)\s*(Bytes|B|KB|MB|GB|TB|PB)/i;
	const match = sizeString.match(regex);
	if (!match) {
		if (throwOnError) throw new Error(`Invalid file size format: ${sizeString}`);
		return NaN;
	}

	const value = parseFloat(match[1]);
	let unit = match[2].toUpperCase();
	if (unit === 'B') unit = 'BYTES';

	switch (unit) {
		case 'BYTES':
			return value;
		case 'KB':
			return value * 1024;
		case 'MB':
			return value * 1024 * 1024;
		case 'GB':
			return value * 1024 * 1024 * 1024;
		case 'TB':
			return value * 1024 * 1024 * 1024 * 1024;
		case 'PB':
			return value * 1024 * 1024 * 1024 * 1024 * 1024;
		default:
			if (throwOnError) throw new Error(`Unknown unit: ${unit}`);
			return NaN;
	}
}

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
