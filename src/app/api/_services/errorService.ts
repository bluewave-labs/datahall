import { NextResponse } from 'next/server';

/**
 * Creates a consistent JSON error response.
 * @param message The error message
 * @param status HTTP status code
 * @param details Optional error details
 */
export function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ message }, { status });
}
