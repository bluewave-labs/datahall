import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const submitVisitorDetails = async ({ linkId, payload }: { linkId: string; payload: any }) => {
	const response = await axios.post(`/api/public_links/${linkId}/access`, payload);

	return response.data;
};

const useVisitorSubmission = () => {
	const mutation = useMutation({
		mutationFn: submitVisitorDetails,
		onError: (error) => {
			console.error('Error submitting visitor details: ', error);
		},
	});

	return {
		mutateAsync: mutation.mutateAsync,
		isPending: mutation.isPending,
		error: mutation.error,
	};
};

export default useVisitorSubmission;
