'use client';

import React, { use } from 'react';

import React, { use } from 'react';

import { Box, Button, Typography } from '@mui/material';
<<<<<<<< HEAD:src/app/links/[linkId]/page.tsx

import FileAccessContainer from './components/FileAccessContainer';
========
import AccessPage from './components/AccessPage';
>>>>>>>> dev:src/app/documentAccess/[linkId]/page.tsx

const LinkIdPage = ({ params }: { params: Promise<{ linkId: string }> }) => {
	const { linkId } = use(params);

	const [showFileAccess, setShowFileAccess] = React.useState(false);

	const handleConfirmClick = () => {
		setShowFileAccess(true);
	};

	return (
		<>
			{!showFileAccess ? (
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
					textAlign='center'
					gap={40}>
					<Box>
						<Typography
							mb={2}
							variant='h1'>
							A secure file has been shared with you
						</Typography>
						<Typography variant='body1'>
							Please confirm your identity to access this document
						</Typography>
					</Box>
					<Button
						sx={{
							minWidth: 360,
						}}
						variant='contained'
						onClick={handleConfirmClick}>
						Confirm
					</Button>
				</Box>
			) : (
				<AccessPage linkId={linkId} />
			)}
		</>
	);
};

export default LinkIdPage;
