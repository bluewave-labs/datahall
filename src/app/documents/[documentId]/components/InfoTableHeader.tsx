import { TableCell, TableRow, TableSortLabel } from '@mui/material';

import { LinkDetail, Contact } from '@/utils/shared/models';

import { ChevronDownIcon, ChevronSelectorVerticalIcon } from '@/../public/assets/icons';

type SortableKeys = 'lastActivity';

interface InfoTableHeaderProps {
	variant?: 'linkTable' | 'visitorTable';
	orderBy?: keyof LinkDetail | Contact | undefined;
	orderDirection?: 'asc' | 'desc' | undefined;
	onSort?: (property: SortableKeys) => void;
}

export default function InfoTableHeader({
	variant,
	orderBy,
	orderDirection,
	onSort,
}: InfoTableHeaderProps) {
	const handleHeaderClick = () => {
		if (onSort) {
			onSort('lastActivity');
		}
	};

	const sortIcon = orderDirection === undefined ? ChevronSelectorVerticalIcon : ChevronDownIcon;

	if (variant === 'linkTable') {
		return (
			<TableRow>
				<TableCell sx={{ width: '45%', pl: 20 }}>LINK</TableCell>
				<TableCell sx={{ width: '20%', textAlign: 'center' }}>
					<TableSortLabel
						active={orderBy === 'lastActivity'}
						direction={orderDirection}
						onClick={handleHeaderClick}
						hideSortIcon={false}
						IconComponent={sortIcon}>
						LAST VIEWED
					</TableSortLabel>
				</TableCell>
				<TableCell sx={{ width: '25%', textAlign: 'center' }}>VIEWS</TableCell>
				<TableCell sx={{ width: '10%', textAlign: 'center' }}>ACTION</TableCell>
			</TableRow>
		);
	}

	// visitorTable
	return (
		<TableRow>
			<TableCell sx={{ width: '30%', pl: 20 }}>VISITOR</TableCell>
			<TableCell sx={{ width: '25%', textAlign: 'center' }}>
				<TableSortLabel
					active={orderBy === 'lastActivity'}
					direction={orderDirection}
					onClick={handleHeaderClick}
					hideSortIcon={false}
					IconComponent={sortIcon}>
					LAST VIEWED
				</TableSortLabel>
			</TableCell>
			<TableCell sx={{ width: '15%', textAlign: 'center' }}>DOWNLOADS</TableCell>
			<TableCell sx={{ width: '15%', textAlign: 'center' }}>DURATION</TableCell>
			<TableCell sx={{ width: '15%', textAlign: 'center' }}>COMPLETION</TableCell>
		</TableRow>
	);
}
