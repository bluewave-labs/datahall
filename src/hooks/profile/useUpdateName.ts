import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PROFILE_QUERY_KEY } from './useProfile';

export interface UpdateNameInput {
	firstName: string;
	lastName: string;
}

export default function useUpdateName() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: UpdateNameInput) => {
			await axios.patch('/api/profile/name', payload);
		},

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
		},
	});
}
