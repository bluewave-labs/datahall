import axios from 'axios';
import { useState } from 'react';

import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import Image from 'next/image';

import CheckIcon from '../../../../../public/assets/icons/documentPage/CheckIcon';
import CopyIcon from '../../../../../public/assets/icons/documentPage/CopyIcon';
import DeleteIcon from '../../../../../public/assets/icons/teamPage/trash-icon.svg';

import ModalWrapper from '@/components/ModalWrapper';

import { useModal, useToast } from '@/hooks';
import { LinkDetail, VisitorDetail } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';

interface InfoTableRowProps {
	variant?: 'linkTable' | 'visitorTable';
	documentDetail: LinkDetail | VisitorDetail;
}

export default function InfoTableRow({ documentDetail, variant }: InfoTableRowProps) {
	const [isLinkCopied, setIsLinkCopied] = useState(false);
	const { showToast } = useToast();
	const deleteModal = useModal();

	// Type Guard for LinkDetail
	const isLinkDetail = (d: LinkDetail | VisitorDetail): d is LinkDetail =>
		(d as LinkDetail).createdLink !== undefined;

	// Type Guard for VisitorDetail
	const isVisitorDetail = (d: LinkDetail | VisitorDetail): d is VisitorDetail =>
		(d as VisitorDetail).visitor !== undefined;

	const handleDeleteLink = async () => {
		try {
			const link = documentDetail as LinkDetail;
			await axios.delete(`/api/documents/${link.document_id}/links/${link.linkId}`);

			showToast({ message: 'Link Deleted!', variant: 'success' });
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
					<TableCell sx={{ width: '45%', pl: 20, py: 11 }}>
						{documentDetail.createdLink}
						<IconButton
							sx={{ ml: 10 }}
							onClick={handleLinkCopy}>
							{isLinkCopied ? <CheckIcon /> : <CopyIcon />}
						</IconButton>
					</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						{formatDateTime(documentDetail.lastViewed)}
					</TableCell>
					<TableCell sx={{ width: '25%', textAlign: 'center' }}>
						{documentDetail.linkViews}
					</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>
						<IconButton onClick={deleteModal.openModal}>
							<Image
								width={15}
								height={17}
								src={DeleteIcon}
								alt='Delete icon'
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
				<TableCell sx={{ width: '30%', pl: 20, py: 6 }}>
					{documentDetail.visitor}
					<br />
					<Typography variant='caption'>{documentDetail.email}</Typography>
				</TableCell>
				<TableCell sx={{ width: '25%', textAlign: 'center' }}>
					{formatDateTime(documentDetail.lastViewed)}
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
