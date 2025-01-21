'use client';
import React from 'react';
import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';

import ModalWrapper from '@/components/ModalWrapper';
import { useDropzone } from 'react-dropzone';

import { useModal, useToast } from '@/hooks';
import axios from 'axios';

interface DragAndDropBoxProps {
	text: string;
	height?: { [key: string]: number };
}

const DragAndDropBox = ({ text, height = { sm: 150, md: 200, lg: 250 } }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();
	const { data: session } = useSession();
	const [uploading, setUploading] = React.useState(false);

	const onDrop = React.useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];

		handleFileSelect(file);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleUploadSuccess = () => {
		showToast({ message: 'File uploaded successfully!', variant: 'success' });
	};

	const handleUploadError = (msg?: string) => {
		const errorMsg = msg || 'File uploading failed!';
		showToast({ message: errorMsg, variant: 'error' });
	};

	const handleFileSelect = async (file: File | undefined) => {
		if (!file) return;

		setUploading(true);

		try {
			if (!session) {
				handleUploadError('User not authenticated!');
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post('/api/documents/upload', formData);

			if (response?.status === 200 && response.data?.document) {
				handleUploadSuccess();
			} else {
				handleUploadError('Server responded with an error.');
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || error.message || 'Unexpected error occurred.';
			handleUploadError(errorMessage);
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			{/* Box for drag-and-drop UI */}
			<div {...getRootProps()}>
				<input
					{...getInputProps({
						accept: 'image/png, application/pdf, image/jpeg',
						multiple: false,
						onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
							const file = event.target.files?.[0];
							handleFileSelect(file);
						},
					})}
				/>
				<Box
					sx={{
						border: '2px dashed rgba(236, 236, 236)',
						borderRadius: 2,
						p: { sm: '1rem', md: '1.5rem', lg: '2rem' },
						bgcolor: 'background.fill',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						cursor: 'pointer',
						height: { height },
					}}>
					<Box
						component='img'
						src='/assets/icons/documentPage/document-upload-icon.svg'
						alt='Document Icon'
						width={{ sm: '7rem', md: '7.5rem', lg: '8rem' }}
						height={{ sm: '7rem', md: '7.5rem', lg: '8rem' }}
						mb={{ sm: '0.1rem', md: '0.3rem', lg: '0.5rem' }}
					/>
					<Button color='secondary'>{text}</Button>
				</Box>

				{/* Modal Wrapper */}
				{/* <ModalWrapper
				variant='upload'
				dialogContentVariant='body2'
				title='Upload file(s)'
				description='Select up to 5 files to upload'
				confirmButtonText='Upload'
				toggleModal={closeModal}
				open={isOpen}
				onClose={handleUploadFile}
			/> */}
			</div>
		</>
	);
};

export default DragAndDropBox;
