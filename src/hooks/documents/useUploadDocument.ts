import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const uploadDocument = async (formData: FormData) => {
	const response = await axios.post('/api/documents', formData);

	return response.data;
};

const useUploadDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: uploadDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['documents'] });
		},
		onError: (error) => {
			console.error('Error adding document: ', error);
		},
	});
};

export default useUploadDocument;
