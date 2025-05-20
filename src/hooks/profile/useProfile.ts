import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/* ----- response shape returned by GET /api/profile ----------------------- */
export interface ProfileDto {
	email: string;
	firstName: string;
	lastName: string;
}

export const PROFILE_QUERY_KEY = ['profile'] as const;

export default function useProfile() {
	return useQuery({
		queryKey: PROFILE_QUERY_KEY,
		queryFn: async (): Promise<ProfileDto> => {
			const { data } = await axios.get<ProfileDto>('/api/profile');
			return data;
		},

		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
}
