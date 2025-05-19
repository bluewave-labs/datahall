import { EmptyState } from '@/components';
import { useFetchLinkVisitors } from '@/hooks';
import { formatDateTime } from '@/shared/utils';

import {
	Box,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

interface LinkVisitorModalProps {
	open: boolean;
	documentId: string;
	linkId: string;
	linkAlias: string;
	onClose: () => void;
}

export default function LinkVisitorModal({
	open,
	documentId,
	linkId,
	linkAlias,
	onClose,
}: LinkVisitorModalProps) {
	const { data, isLoading } = useFetchLinkVisitors(documentId, linkId, open);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='md'>
			<DialogTitle
				variant='h2'
				bgcolor='background.primary'
				color='text.tertiary'>
				Visitor Log - {linkAlias}
			</DialogTitle>
			<DialogContent>
				<TableContainer
					component={Paper}
					sx={{ maxHeight: 500, mt: 11 }}>
					<Table
						aria-label='Info table'
						stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: '27%', pl: '2.5rem' }}>NAME</TableCell>
								<TableCell sx={{ width: '33%', pl: '1.25rem' }}>EMAIL</TableCell>
								<TableCell sx={{ width: '23%', textAlign: 'center' }}>VISITED AT</TableCell>
								<TableCell sx={{ width: '17%', textAlign: 'center' }}>METADATA</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{isLoading && (
								<TableRow>
									<TableCell
										colSpan={4}
										sx={{ width: '100%' }}>
										<Box
											display='flex'
											justifyContent='center'
											mt={4}>
											<CircularProgress />
										</Box>
									</TableCell>
								</TableRow>
							)}

							{data?.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										sx={{ width: '100%' }}>
										<EmptyState message='No visitors have accessed this link yet.' />
									</TableCell>
								</TableRow>
							) : (
								data?.map((visitor) => (
									<TableRow key={visitor.id}>
										<TableCell
											sx={{
												width: '27%',
												pl: '2.5rem',
												py: { sm: '0.98rem', md: '1.1rem', lg: '1.3rem' },
											}}>
											{visitor.name ? visitor.name : 'N/A'}
										</TableCell>
										<TableCell sx={{ width: '33%', pl: '1.25rem' }}>
											{visitor.email ? visitor.email : 'N/A'}
										</TableCell>
										<TableCell sx={{ width: '23%', textAlign: 'center' }}>
											{formatDateTime(visitor.visitedAt, { includeTime: true })}
										</TableCell>
										<TableCell sx={{ width: '17%', textAlign: 'center' }}>
											{visitor.visitorMetaData ? visitor.visitorMetaData : 'N/A'}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</DialogContent>
		</Dialog>
	);
}
