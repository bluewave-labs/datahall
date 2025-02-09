'use client';

import { useState } from 'react';

import { Box, CircularProgress, Divider, Tab, Tabs, Typography } from '@mui/material';

import { FileTypeConfig } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';

import { useDocumentAnalytics, useDocumentDetail } from '@/hooks';

import CustomBarChart from './CustomBarChart';
import FilterToggle from './FilterToggle';
import InfoTable from './InfoTable';

interface DocumentViewProps {
	documentId: string;
}

export default function DocumentView({ documentId }: DocumentViewProps) {
	// 1) Fetch Document details
	const { document, isLoading: isDocLoading, error: docError } = useDocumentDetail(documentId);

	// 2) Fetch (or mock) Analytics
	const {
		filteredData,
		isLoading: analyticsLoading,
		error: analyticsError,
		filterPeriod,
		setFilterPeriod,
	} = useDocumentAnalytics(documentId);

	const [activeTab, setActiveTab] = useState(0);

	if (isDocLoading || analyticsLoading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				mt={10}>
				<CircularProgress />
			</Box>
		);
	}

	if (docError) {
		return (
			<Box
				textAlign='center'
				mt={10}>
				<Typography
					variant='h1'
					color='error'>
					{docError}
				</Typography>
			</Box>
		);
	}

	if (!document) {
		return (
			<Box
				textAlign='center'
				mt={10}>
				<Typography
					variant='h1'
					color='text.secondary'>
					Document not found or you have no access.
				</Typography>
			</Box>
		);
	}

	const { fileName, fileType, updatedAt } = document;

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	return (
		<Box>
			{/* Document Heading */}
			<Box>
				<Box
					display='flex'
					alignItems='center'>
					<Typography variant='h2'>{fileName}</Typography>
					<Box
						component={FileTypeConfig[fileType] || FileTypeConfig['General']}
						pl={2}
						sx={{ width: 24, height: 24 }}
					/>
				</Box>

				<Typography
					variant='body2'
					component='div'
					display='flex'
					gap={4}
					mt={3}>
					<span>Version 1</span>
					<span>-</span>
					<span>Last updated: {formatDateTime(updatedAt)}</span>
				</Typography>
			</Box>

			{/* Analytics Section */}
			<Box
				position='relative'
				p={5}
				my={5}
				border={1}
				borderRadius={2}>
				<Box
					display='flex'
					justifyContent='end'>
					<FilterToggle
						currentFilter={filterPeriod}
						onFilterChange={(period) => setFilterPeriod(period)}
					/>
				</Box>

				{/* Bar Chart (for real data in the future) */}
				<Box mt={{ sm: 6, md: 8, lg: 10 }}>
					<CustomBarChart data={filteredData} />
				</Box>

				{/* Overlay “Coming Soon!” */}
				<Box
					position='absolute'
					top={0}
					left={0}
					width='100%'
					height='100%'
					zIndex={1}
					display='flex'
					justifyContent='center'
					alignItems='center'
					borderRadius={2}
					sx={{
						bgcolor: 'rgba(255, 255, 255, 0.01)',
						backdropFilter: 'blur(3px)',
						color: 'text.brand',
						fontSize: 30,
						fontWeight: 'bold',
					}}>
					Document Analytics Coming Soon!
				</Box>
			</Box>

			<Box mt={{ sm: 1, md: 3, lg: 5 }}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					textColor='primary'
					indicatorColor='primary'>
					<Tab label='Links' />
					<Tab label='Visitors' />
				</Tabs>

				<Divider />

				{activeTab === 0 && (
					<Box mt={{ sm: 1, md: 2, lg: 4 }}>
						<InfoTable
							variant='linkTable'
							documentId={documentId}
						/>
					</Box>
				)}
				{activeTab === 1 && (
					<Box mt={{ sm: 1, md: 2, lg: 4 }}>
						<InfoTable
							variant='visitorTable'
							documentId={documentId}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
}
