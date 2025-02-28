import { Toast } from '@/components';
import { ToastMessage } from './toastTypes';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextValue {
	showToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);

	const showToast = (toast: Omit<ToastMessage, 'id'>) => {
		const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
		setToasts((prev) => [...prev, { id, ...toast }]);

		// Auto-remove toast after a duration
		if (toast.autoHide !== false) {
			setTimeout(() => removeToast(id), 6000);
		}
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{/* Render active toasts */}
			{toasts.map(({ id, message, variant, autoHide }, index) => (
				<Toast
					key={id}
					message={message}
					variant={variant}
					open={true}
					hideToast={() => removeToast(id)}
					autoHide={autoHide}
					index={index}
				/>
			))}
		</ToastContext.Provider>
	);
};

export const useToastContext = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToastContext must be used within a ToastProvider');
	}
	return context;
};
