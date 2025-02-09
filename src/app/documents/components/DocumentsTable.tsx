'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
	Box,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Typography,
} from '@mui/material';

import DocumentsTableHeader from './DocumentsTableHeader';
import DocumentsTableRow from './DocumentsTableRow';
import Paginator from '@/components/Paginator';

import { useSort, useToast } from '@/hooks';
import { DocumentType } from '@/utils/shared/models';

const DocumentsTable = () => {
	const [documents, setDocuments] = useState<DocumentType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { showToast } = useToast();

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [rowHeight, setRowHeight] = useState(59);

	// Fetch data
	useEffect(() => {
		const fetchDocuments = async () => {
			setLoading(true);
			try {
				const response = await axios.get('/api/documents/list');

				setDocuments(response.data.documents || []);
			} catch (err) {
				setError('Failed to load documents. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchDocuments();
	}, []);

	//Calculate the row height of the table
	const calculateRowHeight = () => {
		const width = window.innerWidth;
		if (width >= 1200) {
			return 59; // lg
		} else if (width >= 900) {
			return 54; // md
		} else {
			return 47; // sm
		}
	};

	//Calculate the pageSize based on resizing
	useEffect(() => {
		setRowHeight(calculateRowHeight());
		const handleResize = () => {
			const availableHeight = window.innerHeight - 200; // Adjust for header, footer, etc.
			const calculatedRowsPerPage = Math.floor(availableHeight / rowHeight);
			setPageSize(calculatedRowsPerPage);
		};

		// Initial calculation and add resize listener
		handleResize();
		window.addEventListener('resize', handleResize);

		// Cleanup the event listener on unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleDocumentDelete = async (documentId: string) => {
		try {
			setLoading(true);
			await axios.delete(`/api/documents/${documentId}`);
			showToast({
				message: 'Document deleted successfully',
				variant: 'success',
			});
			setDocuments((prevDocuments) =>
				prevDocuments.filter((doc) => doc.document_id !== documentId),
			);
		} catch (error) {
			showToast({
				message: 'Error deleting document',
				variant: 'error',
			});
		} finally {
			setLoading(false);
		}
	};

	const { sortedData, orderDirection, orderBy, handleSortRequest } =
		useSort<DocumentType>(documents);
	const totalPages = Math.ceil(sortedData.length / pageSize);

	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'>
				<Typography color='error'>{error}</Typography>
			</Box>
		);
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
			minWidth='100%'
			flexGrow={1}>
			<TableContainer component={Paper}>
				<Table aria-label='documents table'>
					<TableHead>
						<DocumentsTableHeader
							orderBy={orderBy}
							orderDirection={orderDirection}
							onSort={handleSortRequest}
						/>
					</TableHead>
					<TableBody>
						{paginatedData.map((document, index) => (
							<DocumentsTableRow
								key={index}
								document={document}
								onDelete={handleDocumentDelete}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{totalPages > 1 && (
				<Box>
					<Paginator
						page={page}
						totalPages={totalPages}
						onPageChange={setPage}
						pageSize={pageSize}
						totalItems={sortedData.length}
					/>
				</Box>
			)}
		</Box>
	);
};

export default DocumentsTable;
