import axios from 'axios';
import { useState } from 'react';

import { Box, IconButton, Button, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import { CheckIcon, CopyIcon, TrashIcon } from '@/icons';

import { ModalWrapper } from '@/components';

import { useModal, useToast } from '@/hooks';
import { Contact, LinkDetail } from '@/shared/models';
import { formatDateTime } from '@/shared/utils';

import LinkVisitorModal from './LinkVisitorModal';

interface InfoTableRowProps {
	variant?: 'linkTable' | 'visitorTable';
	documentDetail: LinkDetail | Contact;
}

export default function InfoTableRow({ documentDetail, variant }: InfoTableRowProps) {
	const [linkVisitorOpen, setLinkVisitorOpen] = useState(false);
	const [isLinkCopied, setIsLinkCopied] = useState(false);
	const { showToast } = useToast();
	const deleteModal = useModal();

	const isLinkDetail = (d: LinkDetail | Contact): d is LinkDetail =>
		(d as LinkDetail).createdLink !== undefined;

	const isVisitorDetail = (d: LinkDetail | Contact): d is Contact =>
		(d as Contact).name !== undefined;

	const handleOpenLinkVisitorModal = () => {
		setLinkVisitorOpen(true);
	};

	const handleCloseLinkVisitorModal = () => {
		setLinkVisitorOpen(false);
	};

	const handleDeleteLink = async () => {
		try {
			const link = documentDetail as LinkDetail;
			await axios.delete(`/api/documents/${link.documentId}/links/${link.linkId}`);

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
						sx={{ width: '45%', pl: '2.5rem', py: { sm: '0.7rem', md: '0.92rem', lg: '1.18rem' } }}>
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
									{documentDetail.alias ? documentDetail.alias : documentDetail.createdLink}
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
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>
						{documentDetail.linkViews}
					</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>
						<IconButton onClick={deleteModal.openModal}>
							<Box
								component={TrashIcon}
								width={{ sm: '1rem', md: '1.04rem', lg: '1.08rem' }}
								height='auto'
							/>
						</IconButton>
					</TableCell>
					<TableCell sx={{ width: '15%', textAlign: 'center' }}>
						<Tooltip
							title='View visitors'
							placement='bottom'>
							<Button
								variant='outlined'
								size='small'
								onClick={handleOpenLinkVisitorModal}>
								View Log
							</Button>
						</Tooltip>
					</TableCell>
				</TableRow>

				{/* Link Visitor Modal */}
				<LinkVisitorModal
					open={linkVisitorOpen}
					documentId={documentDetail.documentId}
					linkId={documentDetail.linkId}
					linkAlias={documentDetail.alias || documentDetail.createdLink}
					onClose={handleCloseLinkVisitorModal}
				/>

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
				<TableCell sx={{ width: '30%', pl: '2.5rem' }}>
					{documentDetail.name ? documentDetail.name : 'N/A'}
					<br />
					<Typography variant='caption'>
						{documentDetail.email ? documentDetail.email : 'N/A'}
					</Typography>
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
