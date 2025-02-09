import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { AlertCircleIcon } from '@/../public/assets/icons';

export default function NotFound() {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			textAlign='center'
			position='fixed'
			top={0}
			left={0}
			width='100vw'
			height='100vh'
			gap={8}
			zIndex={1500}
			pt={40}
			bgcolor='background.content'>
			<Box mb={10}>
				<AlertCircleIcon
					width='5rem'
					height='auto'
				/>
			</Box>

			<Typography
				variant='h2'
				gutterBottom>
				Oops! Page Not Found
			</Typography>
			<Typography
				variant='subtitle2'
				mb={4}>
				The page you’re looking for doesn’t exist. It might have been removed, or the URL might be
				incorrect.
			</Typography>
			<Link
				href='/documents'
				passHref>
				<Button
					variant='contained'
					size='large'>
					Return to Home
				</Button>
			</Link>
		</Box>
	);
}
