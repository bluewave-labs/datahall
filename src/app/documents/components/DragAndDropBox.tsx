'use client';

import React from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';

import { FilePlusIcon } from '@/icons';
import { useModal, useToast } from '@/hooks';
import { useAddDocument } from '@/hooks/documents';
import { ModalWrapper } from '@/components';

interface DragAndDropBoxProps {
	text: string;
	height?: { [key: string]: number; };
}

const DragAndDropBox = ({ text, height = { sm: 150, md: 200, lg: 250 } }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();
	const { data: session } = useSession();
	const [uploading, setUploading] = React.useState(false);
	const router = useRouter();
	const { mutate: addDocument } = useAddDocument();

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


		if (!session) {
			handleUploadError('User not authenticated!');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		addDocument(formData, {
			onSuccess: () => {
				handleUploadSuccess();
			},
			onError: () => {
				handleUploadError();
			}
		});
	};

	return (
		<>
			{/* Box for drag-and-drop UI */}
			<div {...getRootProps()}>
				<input
					{...getInputProps({
						accept: 'application/pdf',
						multiple: false,
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
						component={FilePlusIcon}
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
