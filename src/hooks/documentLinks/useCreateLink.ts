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
	const createLink = async ({
		documentId,
		payload,
	}: CreateLinkParams): Promise<DocumentLinkResponse> => {
		const response = await axios.post(`/api/documents/${documentId}/links`, payload);
		return response.data;
	};

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['links'] });
		},
		onError: (error) => {
			console.error('Error creating link: ', error);
		},
	});
}
