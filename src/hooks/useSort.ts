import { useState, useMemo } from 'react';

type SortFunction<T> = (a: T, b: T, orderDirection: 'asc' | 'desc' | undefined) => number;

export function useSort<T>(
	data: T[],
	initialKey: keyof T | undefined = undefined,
	customSort?: SortFunction<T>,
) {
	const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | undefined>(undefined);
	const [orderBy, setOrderBy] = useState<keyof T | undefined>(initialKey);

	const sortedData = useMemo(() => {
		if (orderDirection && orderBy) {
			return [...data].sort((a, b) => {
				// 1) If a custom sort function is provided, use it.
				if (customSort) {
					return customSort(a, b, orderDirection);
				}

				let aValue: any = a[orderBy];
				let bValue: any = b[orderBy];

				// 2) If both values are Date objects, compare by getTime().
				if (aValue instanceof Date && bValue instanceof Date) {
					return orderDirection === 'asc'
						? aValue.getTime() - bValue.getTime()
						: bValue.getTime() - aValue.getTime();
				}

				// 3) Handle nested objects with a `.name` property, or strings
				if (typeof aValue === 'object' && aValue !== null) {
					aValue = aValue.name?.toUpperCase() ?? '';
				} else if (typeof aValue === 'string') {
					aValue = aValue.toUpperCase();
				}
				if (typeof bValue === 'object' && bValue !== null) {
					bValue = bValue.name?.toUpperCase() ?? '';
				} else if (typeof bValue === 'string') {
					bValue = bValue.toUpperCase();
				}

				// 4) Default string/number comparison
				if (orderDirection === 'asc') {
					return aValue < bValue ? -1 : 1;
				} else if (orderDirection === 'desc') {
					return aValue > bValue ? -1 : 1;
				}
				return 0;
			});
		}
		return data;
	}, [data, orderDirection, orderBy, customSort]);

	const handleSortRequest = (property: keyof T) => {
		if (orderBy === property) {
			// Toggle direction or reset
			if (orderDirection === 'asc') {
				setOrderDirection('desc');
			} else if (orderDirection === 'desc') {
				setOrderDirection(undefined);
				setOrderBy(undefined);
			} else {
				setOrderDirection('asc');
			}
		} else {
			setOrderBy(property);
			setOrderDirection('asc');
		}
	};

	return { sortedData, orderDirection, orderBy, handleSortRequest };
}
