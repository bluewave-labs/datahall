import { useState } from 'react';

import { Menu, MenuItem, Typography } from '@mui/material';

import ModalWrapper from '@/components/ModalWrapper';
import CreateLink from './CreateLink';

import { useModal } from '@/hooks';

interface Props {
	open: boolean;
	documentId: string;
	onClose: () => void;
	anchorEl: HTMLElement | null;
	onDelete: (documentId: string) => void;
	onAnalytics?: () => void;
}

const ActionMenu = ({ anchorEl, open, onClose, documentId, onDelete, onAnalytics }: Props) => {
	const deleteModal = useModal();
	const updateModal = useModal();

	const [openLink, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		onClose();
	};

	return (
		<>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				disableScrollLock={true}>
				<MenuItem onClick={handleClickOpen}>Add new link</MenuItem>
				{/* <MenuItem onClick={onClose}>Duplicate document</MenuItem> */}
				{/* <MenuItem onClick={updateModal.openModal}>Update document</MenuItem> */}
				<MenuItem onClick={onAnalytics}>View analytics</MenuItem>
				<MenuItem onClick={deleteModal.openModal}>
					<Typography
						variant='body1'
						color='error'>
						Delete
					</Typography>
				</MenuItem>
			</Menu>

			<CreateLink
				open={openLink}
				onClose={handleClose}
				documentId={documentId}
			/>

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
};

export default ActionMenu;
