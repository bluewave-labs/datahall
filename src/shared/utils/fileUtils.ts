/**
 * fileUtils.ts
 * ----------------------------------------------------------------------------
 * A collection of utility functions for file sizes handling.
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
 * formatFileSize
 * ----------------------------------------------------------------------------
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
 * parseFileSize
 * ----------------------------------------------------------------------------
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
