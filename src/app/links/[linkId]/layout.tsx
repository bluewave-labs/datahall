import React from 'react';
import { Typography, Box, Link } from '@mui/material';

import BlueWaveLogo from '../../../../public/assets/BluewaveLogo';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<Box
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			flexDirection='column'
			p={20}
			height='100vh'>
			<BlueWaveLogo
				width={400}
				height={40}
			/>
			{children}
			<Box
				display='flex'
				alignItems='center'
				gap={1}>
				<Typography variant='body1'>Need help?</Typography>
				<Link
					href=''
					underline='hover'>
					Contact Support
				</Link>
			</Box>
		</Box>
	);
}
