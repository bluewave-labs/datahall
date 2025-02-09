'use client';
import { useState } from 'react';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	CircularProgress,
} from '@mui/material';

import InfoTableHeader from './InfoTableHeader';
import InfoTableRow from './InfoTableRow';
import Paginator from '@/components/Paginator';

import { LinkDetail, Contact } from '@/utils/shared/models';
import { useDocumentData, useSort } from '@/hooks';

interface InfoTableProps {
	variant: 'linkTable' | 'visitorTable';
	documentId: string;
}

// InfoTable - Renders either a "link table" or "visitor table" based on the `variant`.

export default function InfoTable({ variant, documentId }: InfoTableProps) {
	const [page, setPage] = useState(1);
	const pageSize = 4; // Items per page

	// 1) Fetch data from the new backend route
	const { data, loading, error } = useDocumentData(documentId, variant);

	// 2) Sort the data (the updated useSort hook can handle Date automatically if we sort by "lastViewed")
	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<LinkDetail | Contact>(
		data,
	);

	// 3) If still loading or error
	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				py={25}>
				<CircularProgress />
			</Box>
		);
	}
	if (error) {
		return (
			<Box
				textAlign='center'
				mt={5}>
				<Typography color='error'>{error}</Typography>
			</Box>
		);
	}

	// 4) Pagination
	const totalItems = sortedData.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const startIndex = (page - 1) * pageSize;
	const currentPageData = sortedData.slice(startIndex, startIndex + pageSize);

	// 5) Check for empty states
	const isLinkTableEmpty = variant === 'linkTable' && !currentPageData.length && !totalItems;
	const isVisitorTableEmpty = variant === 'visitorTable' && !totalItems;

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table
					aria-label='Info table'
					stickyHeader>
					<TableHead>
						<InfoTableHeader
							variant={variant}
							orderBy={orderBy}
							orderDirection={orderDirection}
							onSort={handleSortRequest}
						/>
					</TableHead>

					<TableBody>
						{/* If linkTable has zero data, show "Create a link" row */}
						{isLinkTableEmpty && (
							<TableRow>
								<TableCell
									colSpan={4}
									sx={{ textAlign: 'center', py: { sm: '0.5rem', md: '0.7rem', lg: '0.9rem' } }}>
									<Button
										variant='contained'
										sx={{ px: { sm: 50, md: 60, lg: 70 } }}>
										Create a link
									</Button>
								</TableCell>
							</TableRow>
						)}

						{/* If visitorTable has zero data, show "No visitor data found" row */}
						{variant === 'visitorTable' && isVisitorTableEmpty && (
							<TableRow>
								<TableCell
									colSpan={5}
									sx={{ textAlign: 'center', py: { sm: '0.5rem', md: '0.7rem', lg: '0.9rem' } }}>
									<Typography>No visitor data found.</Typography>
								</TableCell>
							</TableRow>
						)}

						{/* Otherwise, render sorted & paginated rows */}
						{currentPageData.map((detail, index) => (
							<InfoTableRow
								key={index}
								documentDetail={detail}
								variant={variant}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{totalPages > 1 && (
				<Paginator
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
					pageSize={pageSize}
					totalItems={totalItems}
				/>
			)}
		</Box>
	);
}
