/**
 * useFormSubmission.ts
 * -----------------------------------------------------------------------------
 * A generic hook for managing async form submissions with minimal boilerplate.
 * -----------------------------------------------------------------------------
 *
 * HOW IT WORKS:
 * 1) Provide an async `onSubmit` function that implements your form's logic
 *    (e.g., sending a POST request).
 * 2) This hook exposes a `handleSubmit` function that you set on your form’s
 *    `onSubmit` or button’s `onClick`. The hook prevents default, runs `onSubmit`,
 *    and handles any thrown errors or success messages.
 * 3) The hook automatically shows error/success toasts via `useToast`,
 *    so you don’t have to write your own toast logic repeatedly.
 * 4) If you want to do something else on success/failure, pass optional callbacks
 *    `onSuccess` or `onError`.
 *
 * USAGE (In a React component):
 *
 * const { loading, error, handleSubmit } = useFormSubmission({
 *   onSubmit: async () => {
 *     // Perform your async logic here (e.g. axios.post...)
 *   },
 *   onSuccess: () => { ... },        // optional callback
 *   onError: (msg) => { ... },       // optional callback
 *   successMessage: 'Form submitted!', // message shown on successful submit
 *   errorMessage: 'Something went wrong', // fallback error message
 * });
 *
 * <form onSubmit={handleSubmit}>
 *   // ...
 *   <button type="submit" disabled={loading}>Submit</button>
 * </form>
 *
 * ADDITIONAL NOTES:
 * - `loading` can be used to display a spinner or disable the submit button.
 * - `error` stores the most recent error message, if you want to show an inline alert.
 * - If you throw an Error in `onSubmit`, the hook will catch it, show a toast, and set `error`.
 */
import { FormEvent, useState } from 'react';

import { useToast } from '@/hooks';

// Hook config interface
interface UseFormSubmissionProps {
	/**
	 * The async function that runs your form's primary logic:
	 * e.g., axios requests, DB updates, etc.
	 */
	onSubmit: () => Promise<void>;

	/**
	 * Callback called only if `onSubmit` completes successfully (no errors thrown).
	 * Optional if you just want to show a success toast.
	 */
	onSuccess?: () => void;

	/**
	 * Callback called if an error is thrown in `onSubmit`.
	 * Receives the error string for custom handling.
	 */
	onError?: (error: string) => void;

	/**
	 * If provided, shows a success toast with this message upon successful submit.
	 */
	successMessage?: string;

	/**
	 * If provided, used as a fallback error in the toast.
	 * Otherwise, the hook attempts to parse the error from `err?.response?.data?.message`.
	 */
	errorMessage?: string;
}

/**
 * A lightweight, reusable hook for form submission in React components.
 * Manages:
 * - loading state
 * - optional inline error
 * - success/error toasts
 */
export const useFormSubmission = ({
	onSubmit,
	onSuccess,
	onError,
	successMessage,
	errorMessage,
}: UseFormSubmissionProps) => {
	// indicates the form is processing
	const [loading, setLoading] = useState(false);

	// optional local error if you want to display an inline message in the component
	const [error, setError] = useState('');

	// toast hook for success/error notifications
	const toast = useToast();

	/**
	 * The function you assign to your form's onSubmit or button's onClick handler.
	 * It prevents the default, sets loading=true, tries `onSubmit`, and handles any errors.
	 */
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault(); // avoid default page reload
		setError(''); // clear old errors
		setLoading(true);

		try {
			// 1) run your custom logic
			await onSubmit();

			// 2) show success toast if applicable
			if (successMessage) {
				toast.showToast({
					message: successMessage,
					variant: 'success',
				});
			}
			// 3) optional onSuccess callback
			onSuccess?.();
		} catch (err: any) {
			// Attempt to parse an error message from server or fallback to a generic
			const message =
				err?.response?.data?.message || err?.message || 'An unexpected error occurred.';
			setError(message);

			// Show toast using errorMessage or fallback to the parsed message
			toast.showToast({
				message: `Error: ${errorMessage || message}`,
				variant: 'error',
			});

			// optional onError callback
			onError?.(message);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading, // can be used to disable buttons or show spinners
		error, // optional inline error if you want to display in your component
		handleSubmit,
		toast, // direct access if you want to show additional custom toasts
	};
};
