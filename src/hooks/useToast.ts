import { useToastContext } from '@/providers/toast/ToastProvider';
import { ToastMessage } from '@/providers/toast/toastTypes';

export const useToast = () => {
	const { showToast } = useToastContext();
	return { showToast: (toast: Omit<ToastMessage, 'id'>) => showToast(toast) };
};
