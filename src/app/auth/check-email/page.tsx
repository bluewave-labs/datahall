'use client';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function VerificationSent() {
	const router = useRouter();

	const handleGoToSignIn = () => {
		router.push('/auth/sign-in'); // Navigate to sign-in page
	};

	return (
		<AuthFormWrapper>
			<Box mb={10}>
				<BluewaveLogo width={248} height={64} />
			</Box>

			<Typography variant="h2" my={10}>
				📬 Check Your Inbox!
			</Typography>

			<Typography variant="subtitle2" textAlign="center" mb={4}>
				We've sent you an email with a verification link. Click the link to complete your
				registration. If you don't see it in your inbox, please check your spam or junk folder.
			</Typography>

			<Button variant="contained" color="primary" onClick={handleGoToSignIn} fullWidth>
				Go to Sign In
			</Button>
		</AuthFormWrapper>
	);
}
