import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import Background from '../../../../public/assets/Background';

const AuthFormWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Background backgroundPosition={0} />
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
