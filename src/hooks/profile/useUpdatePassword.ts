import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface UpdatePasswordInput {
	currentPassword: string;
	newPassword: string;
}

export default function useUpdatePassword() {
	return useMutation({
		mutationFn: async (payload: UpdatePasswordInput) => {
			await axios.patch('/api/profile/password', payload);
		},
	});
}
