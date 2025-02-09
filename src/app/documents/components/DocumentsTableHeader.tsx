import { TableCell, TableRow, TableSortLabel } from '@mui/material';

import { DocumentType } from '@/utils/shared/models';

import { ChevronDownIcon, ChevronSelectorVerticalIcon } from '@/../public/assets/icons';

interface Props {
	orderBy: keyof DocumentType | undefined;
	orderDirection: 'asc' | 'desc' | undefined;
	onSort: (property: keyof DocumentType) => void;
}

const DocumentsTableHeader = ({ orderBy, orderDirection, onSort }: Props) => (
	<TableRow>
		<TableCell sx={{ width: '5%' }}></TableCell>
		<TableCell sx={{ width: '45%' }}>DOCUMENT</TableCell>
		<TableCell sx={{ width: '20%', pl: '1.5rem' }}>
			<TableSortLabel
				active={orderBy === 'uploader'}
				direction={orderDirection}
				onClick={() => onSort('uploader')}
				hideSortIcon={false}
				IconComponent={
					orderDirection === undefined ? ChevronSelectorVerticalIcon : ChevronDownIcon
				}>
				UPLOADER
			</TableSortLabel>
		</TableCell>
		<TableCell sx={{ width: '15%', pl: '1.5rem' }}>ANALYTICS</TableCell>
		<TableCell sx={{ width: '10%', pl: '1.5rem' }}>LINK</TableCell>
		<TableCell sx={{ width: '5%' }}>ACTION</TableCell>
	</TableRow>
);

export default DocumentsTableHeader;
