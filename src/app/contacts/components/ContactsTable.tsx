'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { ChevronDownIcon, ChevronSelectorVerticalIcon } from '@/../public/assets/icons';

import {
	Box,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from '@mui/material';

import EmptyState from '@/components/EmptyState';
import Paginator from '@/components/Paginator';

import ContactsTableRow from './ContactsTableRow';

import { useSort } from '@/hooks';
import { Contact } from '@/utils/shared/models';

export default function ContactsTable() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [rowHeight, setRowHeight] = useState(59);
	const [data, setData] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchContacts();
	}, []);

	const fetchContacts = async () => {
		try {
			const response = await axios.get('/api/contacts');
			const contacts = response.data.data as Contact[];

			const parsedContacts = contacts.map((contact) => ({
				...contact,
				lastActivity: new Date(contact.lastActivity),
			}));
			setData(parsedContacts);
		} catch (err: any) {
			setError(err.message || 'An error occurred while fetching contacts.');
		} finally {
			setLoading(false);
		}
	};

	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<Contact>(
		data,
		'lastActivity',
	);

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

	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);
	const totalPages = Math.ceil(sortedData.length / pageSize);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box mt={4}>
				<Typography
					color='error'
					align='center'
					variant='h6'>
					{error}
				</Typography>
			</Box>
		);
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table aria-label='Contacts Table'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: '30%', pl: '2rem' }}>NAME</TableCell>
							<TableCell sx={{ width: '25%' }}>LAST VIEWED LINK</TableCell>
							<TableCell sx={{ width: '30%', textAlign: 'center' }}>
								<TableSortLabel
									active={orderBy === 'lastActivity'}
									direction={orderDirection}
									onClick={() => handleSortRequest('lastActivity')}
									hideSortIcon={false}
									IconComponent={
										orderDirection === undefined ? ChevronSelectorVerticalIcon : ChevronDownIcon
									}>
									LAST ACTIVITY
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ width: '15%', textAlign: 'center' }}>VISITS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!paginatedData.length ? (
							<TableRow>
								<TableCell
									colSpan={4}
									sx={{ width: '100%' }}>
									<EmptyState message='When users download a file and provide personal information, they will appear here.' />
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((row) => (
								<ContactsTableRow
									key={row.id}
									contact={row}
								/>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{totalPages > 1 && (
				<Paginator
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
					pageSize={pageSize}
					totalItems={data.length}
				/>
			)}
		</>
	);
}
