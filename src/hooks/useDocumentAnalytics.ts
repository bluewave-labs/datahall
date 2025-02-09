'use client';

import { useState, useEffect, useMemo } from 'react';

import { mockGraphData } from '@/seed/analytics';

interface BarDataItem {
	date: Date;
	month: string;
	Views: number;
	Downloads: number;
}

export type FilterPeriod = 'fromStart' | 'last30Days' | 'last7Days';

interface UseDocumentAnalyticsReturn {
	filteredData: BarDataItem[];
	isLoading: boolean;
	error: string | null;
	filterPeriod: FilterPeriod;
	setFilterPeriod: (period: FilterPeriod) => void;
}

export default function useDocumentAnalytics(documentId: string): UseDocumentAnalyticsReturn {
	const [analyticsData, setAnalyticsData] = useState<BarDataItem[]>([]);
	const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('fromStart');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!documentId) return;

		const fetchAnalytics = async () => {
			try {
				setIsLoading(true);
				setError(null);

				// In a real scenario, you might do:
				// const { data } = await axios.get(`/api/analytics?documentId=${documentId}`);
				// setAnalyticsData(data);

				setAnalyticsData(mockGraphData);
			} catch (err: any) {
				setError('Error fetching analytics data');
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalytics();
	}, [documentId]);

	// Filter logic
	const filteredData = useMemo(() => {
		if (!analyticsData.length) return [];
		const currentDate = new Date();

		switch (filterPeriod) {
			case 'last30Days':
				return analyticsData.filter(
					(item) => currentDate.getTime() - item.date.getTime() <= 30 * 24 * 60 * 60 * 1000,
				);
			case 'last7Days':
				return analyticsData.filter(
					(item) => currentDate.getTime() - item.date.getTime() <= 7 * 24 * 60 * 60 * 1000,
				);
			case 'fromStart':
			default:
				return analyticsData;
		}
	}, [filterPeriod, analyticsData]);

	return {
		filteredData,
		isLoading,
		error,
		filterPeriod,
		setFilterPeriod,
	};
}
