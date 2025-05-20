import React from 'react';

import { Typography, Box, Button } from '@mui/material';

import { useToast } from '@/hooks';

import { formatFileSize, isViewableFileType } from '@/shared/utils';
import { useCreateDocumentAnalytics } from '@/hooks';

interface FilePageProps {
	signedUrl: string;
	fileName: string;
	size: number;
	fileType?: string;
	documentId?: string;
	documentLinkId?: string;
}

const FileDisplay: React.FC<FilePageProps> = ({
	signedUrl,
	fileName,
	size,
	fileType,
	documentId = '',
	documentLinkId = '',
}) => {
	const { showToast } = useToast();
	const createDocumentAnalytics = useCreateDocumentAnalytics();
	const showFileViewButton = isViewableFileType(fileType);

	const handleDownloadFile = async () => {
		try {
			const response = await fetch(signedUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			link.click();

			window.URL.revokeObjectURL(url);

			await handleLogDocumentAnalytics({ eventType: 'DOWNLOAD' });

			showToast({ message: 'File downloaded successfully', variant: 'success' });
		} catch (error) {
			console.error('Error downloading the file:', error);
			showToast({
				message: 'Error downloading the file. Please try again.',
				variant: 'error',
			});
		}
	};

	const handleViewFile = async () => {
		await handleLogDocumentAnalytics({ eventType: 'VIEW' });

		window.open(signedUrl, '_blank');
	};

	const handleLogDocumentAnalytics = async (payload: any) => {
		await createDocumentAnalytics.mutateAsync({
			documentId,
			documentLinkId,
			payload: { ...payload },
		});
	};

	return (
		<Box textAlign='center'>
			<Typography
				variant='h1'
				color='text.secondary'>
				File is ready for download
			</Typography>
			<Typography variant='subtitle2'>
				Thanks for verifying your details. You can now download the document.
			</Typography>
			<Box
				display='flex'
				justifyContent='center'
				mt={{ sm: 15, md: 18, lg: 20 }}
				mx={0}
				gap={2}>
				<Typography variant='subtitle2'>Document:</Typography>
				<Typography
					variant='subtitle2'
					color='primary'>
					{fileName} ({formatFileSize(size)})
				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='center'
				gap={{ sm: 30, md: 35, lg: 40 }}
				mt={{ sm: 30, md: 35, lg: 40 }}>
				{showFileViewButton && (
					<Button
						variant='contained'
						onClick={handleViewFile}>
						View file
					</Button>
				)}
				<Button
					variant='contained'
					onClick={handleDownloadFile}>
					Download file
				</Button>
			</Box>
		</Box>
	);
};

export default FileDisplay;
