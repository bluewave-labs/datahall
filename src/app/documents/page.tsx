import prisma from '@/lib/prisma';

import {
	Box,
	Container,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

import { authService } from '@/services';

import { BackgroundIcon, CheckCircleIcon } from '@/icons';

import DocumentsTable from './components/DocumentsTable';
import DragAndDropBox from './components/DragAndDropBox';

export const dynamic = 'force-dynamic';

export default async function DocumentsPage() {
	let documentCount = 0;

	// NEED TO REMOVE THIS
	// This was a temporary solution.
	// After Tanstack is implemented, we need to use the Tanstack query to fetch the document count.
	try {
		// Authenticate the user and fetch their document count, temporarily
		const userId = await authService.authenticate();
		try {
			documentCount = await prisma.document.count({
				where: {
					user_id: userId,
				},
			});
		} catch (error) {
			console.error('Error fetching document count for user:', error);
		}
	} catch (error) {
		console.error('Error fetching document count or authenticating user:', error);
	}

	const isEmptyState = documentCount === 0;

	return (
		<Container
			sx={{
				height: '90%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: isEmptyState ? 'center' : 'flex-start',
				alignItems: 'center',
			}}>
			{/* Empty Section */}
			{isEmptyState ? (
				<>
					<BackgroundIcon backgroundPosition={0}></BackgroundIcon>
					<Box
						display='flex'
						flexDirection='column'
						alignContent='center'
						textAlign='center'
						width='100%'
						zIndex={1}>
						<Typography
							variant='h2'
							component='span'
							mb={{ sm: 5, md: 8, lg: 10 }}>
							Welcome to BlueWave DataHall
						</Typography>
						<List
							sx={{
								textAlign: 'left',
								maxWidth: '100%',
								mb: { sm: 12, md: 17, lg: 22 },
								mx: 'auto',
							}}>
							{[
								'Securely share files and manage permissions',
								'Keep your users updated with the latest documents',
								'Build trust with a professional user interface',
							].map((text, index) => (
								<ListItem key={index}>
									<ListItemIcon>
										<CheckCircleIcon
											width={20}
											height={20}
											color='primaryOutline'
										/>
									</ListItemIcon>
									<ListItemText
										slotProps={{ primary: { variant: 'h3' } }}
										primary={text}
									/>
								</ListItem>
							))}
						</List>
						<DragAndDropBox
							documentCount={documentCount}
							text='Drag and drop your first document here or click to upload'
						/>
					</Box>
				</>
			) : (
				<>
					{/* Header Section */}
					<Box
						mb={{ sm: 8, md: 10, lg: 12 }}
						width='100%'>
						<Typography variant='h2'>Manage your documents</Typography>
						<Typography variant='h6'>
							{documentCount} document{documentCount !== 1 ? 's' : ''}
						</Typography>
					</Box>
					{/* Drag-and-Drop Section */}
					<Box
						mb={{ sm: 8, md: 10, lg: 12 }}
						width='100%'>
						<DragAndDropBox
							documentCount={documentCount}
							text='Drag and drop your document here or click to upload'
						/>
					</Box>

					{/* 📊 Documents Table */}
					<DocumentsTable />
				</>
			)}
		</Container>
	);
}
