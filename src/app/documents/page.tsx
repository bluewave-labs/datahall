import { NextRequest } from 'next/server';

import {
	Box,
	Container,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

import { fetchDocumentCount } from '@/services/documentService';
import { authenticate } from '@lib/middleware/authenticate';

import { CheckCircleIcon } from '@/../public/assets/icons';
import Background from '../../../public/assets/Background';

import DocumentsTable from './components/DocumentsTable';
import DragAndDropBox from './components/DragAndDropBox';

export default async function DocumentsPage(req: NextRequest) {
	let documentCount = 0;

	try {
		// Authenticate the user and fetch their document count
		const userId = await authenticate(req);
		documentCount = await fetchDocumentCount(userId);
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
					<Background backgroundPosition={0}></Background>
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
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon
										width={20}
										height={20}
										color='primaryOutline'
									/>
								</ListItemIcon>
								<ListItemText primary='Securely share files and manage permissions' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon
										width={20}
										height={20}
										color='primaryOutline'
									/>
								</ListItemIcon>
								<ListItemText primary='Keep your users updated with the latest documents' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon
										width={20}
										height={20}
										color='primaryOutline'
									/>
								</ListItemIcon>
								<ListItemText primary='Build trust with a professional user interface' />
							</ListItem>
						</List>
						<DragAndDropBox text='Drag and drop your first document here or click to upload' />
					</Box>
				</>
			) : (
				<>
					{/* Header Section */}
					<Box
						mb={{ sm: 8, md: 10, lg: 12 }}
						width='100%'>
						<Typography variant='h2'>Manage your documents</Typography>
						<Typography variant='h6'>{documentCount} documents</Typography>
					</Box>
					{/* Drag-and-Drop Section */}
					<Box
						mb={{ sm: 8, md: 10, lg: 12 }}
						width='100%'>
						<DragAndDropBox text='Drag and drop your document here or click to upload' />
					</Box>

					{/* Documents Table Section */}
					<DocumentsTable />
				</>
			)}
		</Container>
	);
}
