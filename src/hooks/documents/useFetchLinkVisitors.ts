import { LinkVisitor } from '@/shared/models';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useFetchLinkVisitors(
	documentId: string,
	linkId: string,
	enabled?: boolean,
) {
	const fetchLinkVisitors = async (): Promise<LinkVisitor[]> => {
		const response = await axios.get(`/api/documents/${documentId}/links/${linkId}/log`);
		return response.data.data;
	};

	return useQuery({
		queryKey: ['linkVisitors', documentId, linkId], // Unique cache per document link
		queryFn: fetchLinkVisitors, // Function to fetch data
		enabled, // Only run when modal is open
		staleTime: 1000 * 30, // Data stays fresh for 30 seconds before being marked stale
		refetchInterval: 1000 * 60, // Background refetch every 60 seconds
		refetchOnWindowFocus: true, // Refetch when user focuses the window
		refetchOnReconnect: true, // Refetch when the user reconnects to the internet
	});
}
