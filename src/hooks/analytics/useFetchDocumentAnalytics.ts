import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface DocumentAnalyticsResponse {}

const fetchDocumentAnalytics = async (
	documentId: string,
	documentLinkId?: string,
): Promise<DocumentAnalyticsResponse> => {
	let url = `/api/documents/${documentId}/analytics`;

	if (documentLinkId) {
		url = `/api/documents/${documentId}/links/${documentLinkId}/analytics`;
	}

	const response = await axios.get(url);

	return response.data;
};

const useFetchDocumentAnalytics = (documentId: string, documentLinkId?: string) => {
	return useQuery({
		queryKey: ['documentAnalytics', documentId, documentLinkId],
		queryFn: () => fetchDocumentAnalytics(documentId, documentLinkId),
	});
};

export default useFetchDocumentAnalytics;
