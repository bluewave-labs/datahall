import { Contact } from '@/shared/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useFetchContacts() {
	const fetchContacts = async (): Promise<Contact[]> => {
		const response = await axios.get('/api/contacts');
		return response.data.data;
	};

	return useQuery({
		queryKey: ['contacts'], // Caching key
		queryFn: fetchContacts, // Function to fetch data
		staleTime: 1000 * 30, // Data stays fresh for 30 seconds before being marked stale
		refetchInterval: 1000 * 60, // Background refetch every 60 seconds
		refetchOnWindowFocus: true, // Refetch when user focuses the window
		refetchOnReconnect: true, // Refetch when the user reconnects to the internet
	});
}
