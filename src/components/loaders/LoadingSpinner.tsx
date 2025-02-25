import { Box, CircularProgress } from '@mui/material';

export default function LoadingSpinner() {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			height='100vh'
			position='fixed'
			top={0}
			left={0}
			width='100%'
			zIndex={1000}
			bgcolor='background.fill' // Optional background to cover content
		>
			<CircularProgress size={80} />
		</Box>
	);
}
