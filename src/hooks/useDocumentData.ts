'use client';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { Contact, LinkDetail } from '@/utils/shared/models';

interface UseDocumentDataReturn {
	data: LinkDetail[] | Contact[];
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export default function useDocumentData(
	documentId: string,
	variant: 'linkTable' | 'visitorTable',
): UseDocumentDataReturn {
	const [data, setData] = useState<LinkDetail[] | Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		if (!documentId) {
			setError('No document ID provided');
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			setError(null);

			const url =
				variant === 'linkTable'
					? `/api/documents/${documentId}/links`
					: `/api/documents/${documentId}/visitors`;

			const res = await axios.get(url);
			if (variant === 'linkTable') {
				setData(res.data.links || []);
				console.log('🚀 ~ fetchData ~ res.data.links:', res.data.links);
			} else {
				setData(res.data.visitors || []);
			}
		} catch (err: any) {
			setError(err.response?.data?.error || 'Error fetching data');
		} finally {
			setLoading(false);
		}
	}, [documentId, variant]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
}
