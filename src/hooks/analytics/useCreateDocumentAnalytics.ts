import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createAnalytics = async ({
	documentId,
	documentLinkId,
	payload,
}: {
	documentId: string;
	documentLinkId: string;
	payload: any; // JSON object
}) => {
	const response = await axios.post(
		`/api/documents/${documentId}/links/${documentLinkId}/analytics`,
		payload,
	);

	return response.data;
};

const useCreateDocumentAnalytics = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			documentId,
			documentLinkId,
			payload,
		}: {
			documentId: string;
			documentLinkId: string;
			payload: any; // JSON object
		}) => {
			return createAnalytics({
				documentId,
				documentLinkId,
				payload,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['documentAnalytics'] });
		},
		onError: (error) => {
			console.error('Error adding analytics: ', error);
		},
	});
};

export default useCreateDocumentAnalytics;
