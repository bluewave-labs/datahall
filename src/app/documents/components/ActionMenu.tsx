import { Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';

import ModalWrapper from '@/components/ModalWrapper';
import CreateLink from './CreateLink';
import ShareableLinkDialog from './ShareableLinkDialog';

import { useModal } from '@/hooks';

interface Props {
	open: boolean;
	documentId: string;
	onClose: () => void;
	anchorEl: HTMLElement | null;
	onDelete: (documentId: string) => void;
	onAnalytics?: () => void;
}

export default function ActionMenu({
	anchorEl,
	open,
	onClose,
	documentId,
	onDelete,
	onAnalytics,
}: Props) {
	const deleteModal = useModal();
	const updateModal = useModal();

	// Store the newly created link to show in ShareableLinkDialog
	const [newLinkUrl, setNewLinkUrl] = useState('');
	const [createLinkOpen, setCreateLinkOpen] = useState(false);

	function handleOpenCreateLink() {
		setCreateLinkOpen(true);
		onClose();
	}

	function handleCloseCreateLink(action: string, createdLink?: string) {
		setCreateLinkOpen(false);
		if (createdLink) {
			setNewLinkUrl(createdLink);
		}
	}

	return (
		<>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				disableScrollLock={true}>
				<MenuItem onClick={handleOpenCreateLink}>Create Link</MenuItem>
				{/* <MenuItem onClick={onClose}>Duplicate document</MenuItem> */}
				{/* <MenuItem onClick={updateModal.openModal}>Update document</MenuItem> */}
				{onAnalytics && <MenuItem onClick={onAnalytics}>View analytics</MenuItem>}
				<MenuItem onClick={deleteModal.openModal}>
					<Typography
						variant='body1'
						color='error'>
						Delete
					</Typography>
				</MenuItem>
			</Menu>

			{/* CREATE LINK DIALOG */}
			<CreateLink
				open={createLinkOpen}
				documentId={documentId}
				onClose={handleCloseCreateLink}
			/>

			{/* SHAREABLE LINK DIALOG */}
			<ShareableLinkDialog
				linkUrl={newLinkUrl}
				onClose={() => setNewLinkUrl('')} // hide the dialog
			/>

			{/* DELETE CONFIRMATION MODAL */}
			<ModalWrapper
				variant='delete'
				title='Really delete this file?'
				description='When you delete this file, all the links associated with the file will also be removed. This action is non-reversible.'
				confirmButtonText='Delete file'
				open={deleteModal.isOpen}
				toggleModal={deleteModal.closeModal}
				onClose={() => {
					onDelete(documentId);
				}}
			/>

			<ModalWrapper
				variant='upload'
				title='Update with a new document'
				description='When you update with a new document, the current link won’t change.'
				confirmButtonText='Update'
				open={updateModal.isOpen}
				toggleModal={updateModal.closeModal}
				onClose={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		</>
	);
}
