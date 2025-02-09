import React from 'react';

import { styled } from '@mui/material/styles';
import { Typography, Box, Button } from '@mui/material';

import { useToast } from '@/hooks';

import { formatFileSize } from '@/utils/shared/utils';

const ActionButton = styled(Button)({
	width: 250,
	fontWeight: 600,
});

interface FilePageProps {
	signedUrl: string;
	fileName: string;
	size: number;
}

const FileDisplay: React.FC<FilePageProps> = ({ signedUrl, fileName, size }) => {
	const { showToast } = useToast();

	const handleDownload = async () => {
		try {
			const response = await fetch(signedUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			link.click();

			window.URL.revokeObjectURL(url);
			showToast({ message: 'File downloaded successfully', variant: 'success' });
		} catch (error) {
			console.error('Error downloading the file:', error);
			showToast({
				message: 'Error downloading the file. Please try again.',
				variant: 'error',
			});
		}
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
				my={20}
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
				justifyContent='space-between'
				gap={40}>
				<ActionButton
					variant='contained'
					onClick={() => {
						window.open(signedUrl, '_blank');
					}}>
					View file
				</ActionButton>
				<ActionButton
					variant='contained'
					onClick={handleDownload}>
					Download file
				</ActionButton>
			</Box>
		</Box>
	);
};

export default FileDisplay;
