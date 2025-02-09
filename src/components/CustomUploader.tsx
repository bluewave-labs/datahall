import axios from 'axios';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Box, Button, TextField } from '@mui/material';

import { useToast } from '@/hooks';
import { formatFileSize } from '@/utils/shared/utils';

interface DocumentUploaderProps {
	allowedFormats?: string;
	fileInfo: {
		name: string;
		size: string;
		type: string;
	};
	onFileInfoChange: React.Dispatch<
		React.SetStateAction<{
			name: string;
			size: string;
			type: string;
		}>
	>;
	onUploadSuccess?: () => void;
	onUploadError?: (message?: string) => void;
}

export default function DocumentUploader({
	allowedFormats,
	fileInfo,
	onFileInfoChange,
	onUploadSuccess,
	onUploadError,
}: DocumentUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const { data: session } = useSession();
	const { showToast } = useToast();

	const getAcceptedTypes = (): string => {
		if (!allowedFormats) return '*/*';

		const upper = allowedFormats.toUpperCase();
		if (upper.includes('JPG') || upper.includes('PNG')) return 'image/*';
		if (upper.includes('PDF')) return 'application/pdf';
		return '*/*';
	};

	const handleUploadSuccess = () => {
		showToast({ message: 'File uploaded successfully!', variant: 'success' });
		onUploadSuccess?.();
	};

	const handleUploadError = (msg?: string) => {
		const errorMsg = msg || 'File uploading failed!';
		showToast({ message: errorMsg, variant: 'error' });
		onUploadError?.(errorMsg);
	};

	const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		onFileInfoChange({
			name: file.name,
			size: formatFileSize(file.size),
			type: file.type,
		});

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
		<Box display='flex'>
			<TextField
				value={fileInfo.name}
				size='small'
				fullWidth
				placeholder='No file selected'
				disabled
				sx={{ mr: 2 }}
			/>
			<Button
				variant='outlined'
				size='small'
				onClick={() => document.getElementById('doc-file-input')?.click()}
				disabled={uploading}
				sx={{
					borderColor: 'text.notes',
					minWidth: '6rem',
					typography: 'subtitle2',
				}}>
				{uploading ? 'Uploading...' : 'Browse'}
			</Button>
			<input
				id='doc-file-input'
				type='file'
				accept={getAcceptedTypes()}
				style={{ display: 'none' }}
				onChange={handleFileSelect}
			/>
		</Box>
	);
}
