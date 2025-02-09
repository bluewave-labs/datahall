import React from 'react';

import { Box, Typography } from '@mui/material';

import { LinkBrokenIcon } from '@/../public/assets/icons';

interface LinkMessageProps {
	message: string;
	description?: string;
}

const LinkMessage: React.FC<LinkMessageProps> = (props) => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'>
			<Box
				textAlign='center'
				position='absolute'
				top='50%'>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					mb={2}
					gap={2}>
					<Typography
						variant='h1'
						color='text.error'>
						{props.message}
					</Typography>
					<LinkBrokenIcon />
				</Box>
				<Typography variant='body1'>
					The link you used is no longer active. If you believe this is an error, please contact the
					document owner.
				</Typography>
			</Box>
		</Box>
	);
};

export default LinkMessage;
