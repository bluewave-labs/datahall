import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material';
import { useEffect } from 'react';

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress
				variant='determinate'
				{...props}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Typography
					variant='caption'
					component='div'
					color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
};

interface CustomCircularProgressProps {
	fileInfo: { name: string; size: string; type: string };
	progress: number;
	handleProgress: React.Dispatch<React.SetStateAction<number>>;
}

const CustomCircularProgress = ({
	fileInfo,
	progress,
	handleProgress,
}: CustomCircularProgressProps) => {
	useEffect(() => {
		const timer = setInterval(() => {
			handleProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, [fileInfo.name]);

	return <CircularProgressWithLabel value={progress} />;
};

export default CustomCircularProgress;
