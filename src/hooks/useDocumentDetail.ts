import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import { DocumentType } from '@/utils/shared/models';

interface UseDocumentDetailReturn {
	document: DocumentType | null;
	isLoading: boolean;
	error: string | null;
	refetch: () => void;
}

export default function useDocumentDetail(documentId: string): UseDocumentDetailReturn {
	const [document, setDocument] = useState<DocumentType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchDocumentDetails = useCallback(async () => {
		if (!documentId) {
			setError('No document ID provided.');
			setIsLoading(false);
			return;
		}
		try {
			setIsLoading(true);
			setError(null);

			const response = await axios.get(`/api/documents/${documentId}`);
			setDocument(response.data.document);
		} catch (err: any) {
			setError(err.response?.data?.error || 'Error fetching document details');
		} finally {
			setIsLoading(false);
		}
	}, [documentId]);

	useEffect(() => {
		fetchDocumentDetails();
	}, [fetchDocumentDetails]);

	return { document, isLoading, error, refetch: fetchDocumentDetails };
}
