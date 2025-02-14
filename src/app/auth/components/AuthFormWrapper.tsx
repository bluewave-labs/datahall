import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import { BackgroundIcon } from '@/icons';

const AuthFormWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<BackgroundIcon backgroundPosition={0} />
			<Container
				component='main'
				sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					mt={8}
					gap={10}>
					{children}
				</Box>
			</Container>
		</>
	);
};

export default AuthFormWrapper;
