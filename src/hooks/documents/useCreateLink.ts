import { CreateDocumentLinkPayload, LinkType } from '@/shared/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface CreateLinkParams {
	documentId: string;
	payload: CreateDocumentLinkPayload;
}

interface DocumentLinkResponse {
	message: string;
	link: LinkType;
}

export default function useCreateLink() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		// Returns a promise that resolves to the response data, thus fixing the useFormSubmission issue
		mutationFn: async ({
			documentId,
			payload,
		}: CreateLinkParams): Promise<DocumentLinkResponse> => {
			const response = await axios.post(`/api/documents/${documentId}/links`, payload);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['links'] });
		},
	});

	return {
		mutateAsync: mutation.mutateAsync,
		isPending: mutation.isPending,
		error: mutation.error,
	};
}
