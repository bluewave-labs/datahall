import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addDocument = async (formData: FormData) => {
	const response = await axios.post('/api/documents', formData);

	return response.data;
};

const useAddDocument = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addDocument,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['documents'] });
		},
		onError: (error) => {
			console.error('Error adding document: ', error);
		},
	});
};

export default useAddDocument;
