import { Box, Button, Pagination, PaginationItem } from '@mui/material';

import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@/../public/assets/icons';

interface PaginatorProps {
	page: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
	pageSize: number;
	totalItems: number;
}

const Paginator = ({ page, totalPages, onPageChange, pageSize, totalItems }: PaginatorProps) => {
	const handlePageChange = (_event: any, newPage: number) => {
		onPageChange(newPage);
	};

	if (totalItems <= pageSize) {
		return null;
	}

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			mt='1rem'
			gap='5rem'>
			<Button
				variant='outlined'
				color='secondary'
				startIcon={<ArrowNarrowLeftIcon />}
				onClick={() => onPageChange(page > 1 ? page - 1 : page)}
				disabled={page === 1}
				sx={{ minWidth: '8rem' }}>
				Previous
			</Button>

			<Pagination
				count={totalPages}
				page={page}
				hideNextButton
				hidePrevButton
				size='medium'
				onChange={handlePageChange}
				shape='rounded'
				color='secondary'
				renderItem={(item) => (
					<PaginationItem
						{...item}
						sx={{ padding: '0 8px' }}
					/>
				)}
			/>
			<Button
				variant='outlined'
				color='secondary'
				endIcon={<ArrowNarrowRightIcon />}
				onClick={() => onPageChange(page < totalPages ? page + 1 : page)}
				disabled={page === totalPages}
				sx={{ minWidth: '8rem' }}>
				Next
			</Button>
		</Box>
	);
};

export default Paginator;
