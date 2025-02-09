import axios from 'axios';
import { useState } from 'react';

import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import { CheckIcon, CopyIcon, TrashIcon } from '@/../public/assets/icons';

import ModalWrapper from '@/components/ModalWrapper';

import { useModal, useToast } from '@/hooks';
import { LinkDetail, Contact } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';

interface InfoTableRowProps {
	variant?: 'linkTable' | 'visitorTable';
	documentDetail: LinkDetail | Contact;
}

export default function InfoTableRow({ documentDetail, variant }: InfoTableRowProps) {
	const [isLinkCopied, setIsLinkCopied] = useState(false);
	const { showToast } = useToast();
	const deleteModal = useModal();

	const isLinkDetail = (d: LinkDetail | Contact): d is LinkDetail =>
		(d as LinkDetail).createdLink !== undefined;

	const isVisitorDetail = (d: LinkDetail | Contact): d is Contact =>
		(d as Contact).name !== undefined;

	const handleDeleteLink = async () => {
		try {
			const link = documentDetail as LinkDetail;
			await axios.delete(`/api/documents/${link.document_id}/links/${link.linkId}`);

			showToast({ message: 'Link deleted!', variant: 'success' });
			deleteModal.closeModal();
		} catch (err) {
			showToast({ message: 'Error deleting link', variant: 'error' });
		}
	};

	const handleLinkCopy = () => {
		if (isLinkDetail(documentDetail)) {
			navigator.clipboard.writeText(documentDetail.createdLink);
			setIsLinkCopied(true);
			setTimeout(() => {
				setIsLinkCopied(false);
			}, 3000);
		}
	};

	// Render Link Table Row
	if (variant === 'linkTable' && isLinkDetail(documentDetail)) {
		return (
			<>
				<TableRow hover>
					<TableCell
						sx={{ width: '45%', pl: 20, py: { sm: '0.7rem', md: '0.92rem', lg: '1.18rem' } }}>
						<Box
							display='flex'
							alignItems='center'
							gap={10}>
							<Tooltip
								enterDelay={800}
								title={documentDetail.createdLink}
								slotProps={{
									tooltip: {
										sx: {
											maxWidth: 'none',
											whiteSpace: 'nowrap',
										},
									},
								}}
								placement='bottom-start'>
								<Typography>
									{documentDetail.friendlyName
										? documentDetail.friendlyName
										: documentDetail.createdLink}
									<IconButton
										sx={{ ml: 10 }}
										onClick={handleLinkCopy}>
										{isLinkCopied ? <CheckIcon /> : <CopyIcon />}
									</IconButton>
								</Typography>
							</Tooltip>
						</Box>
					</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						{formatDateTime(documentDetail.lastActivity)}
					</TableCell>
					<TableCell sx={{ width: '25%', textAlign: 'center' }}>
						{documentDetail.linkViews}
					</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>
						<IconButton onClick={deleteModal.openModal}>
							<Box
								component={TrashIcon}
								width={{ sm: '1rem', md: '1.1rem', lg: '1.18rem' }}
								height='auto'
							/>
						</IconButton>
					</TableCell>
				</TableRow>

				{/* Confirm Delete Modal */}
				<ModalWrapper
					variant='delete'
					title='Really delete this link?'
					description='Deleting this link is permanent. All associated share settings will be removed.'
					confirmButtonText='Delete link'
					open={deleteModal.isOpen}
					onClose={handleDeleteLink}
					toggleModal={deleteModal.closeModal}
				/>
			</>
		);
	}

	// Render Visitor Table Row
	if (variant === 'visitorTable' && isVisitorDetail(documentDetail)) {
		return (
			<TableRow hover>
				<TableCell sx={{ width: '30%', pl: 20, py: { sm: '0.9rem', md: '1.1rem', lg: '1.3rem' } }}>
					{documentDetail.name}
					<br />
					<Typography variant='caption'>{documentDetail.email}</Typography>
				</TableCell>
				<TableCell sx={{ width: '25%', textAlign: 'center' }}>
					{formatDateTime(documentDetail.lastActivity)}
				</TableCell>
				<TableCell sx={{ width: '15%', textAlign: 'center' }}>{documentDetail.downloads}</TableCell>
				<TableCell sx={{ width: '15%', textAlign: 'center' }}>{documentDetail.duration}</TableCell>
				<TableCell sx={{ width: '15%', textAlign: 'center' }}>
					{documentDetail.completion}
				</TableCell>
			</TableRow>
		);
	}

	// If neither variant matches or the data is incomplete
	return null;
}
