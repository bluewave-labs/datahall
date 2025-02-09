export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
	id: string; // Unique identifier for each toast
	message: string;
	variant?: ToastVariant;
	autoHide?: boolean;
}
