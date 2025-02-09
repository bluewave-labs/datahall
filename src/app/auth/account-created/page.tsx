'use client';

import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingButton from '@/components/LoadingButton';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function AccountCreated() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token');
	const userId = searchParams.get('userId');

	const [loading, setLoading] = useState(true);
	const [statusMessage, setStatusMessage] = useState('Verification in progress...');
	const [isVerified, setIsVerified] = useState(false);

	useEffect(() => {
		if (!token && !userId) {
			setStatusMessage('Missing verification token or userId.');
			setLoading(false);
			return;
		}

		// Poll every 5 seconds
		const intervalId = setInterval(async () => {
			try {
				const queryParam = token ? `token=${token}` : `userId=${userId}`;
				const response = await fetch(`/api/auth/verify-email?${queryParam}`);
				const data = await response.json();

				if (response.ok) {
					setIsVerified(true);
					setStatusMessage('🎉 Woohoo! Account Verified! 🎉');
					setLoading(false);
					clearInterval(intervalId);
				} else {
					// Not verified or invalid
					if (data.message === 'User is not verified') {
						// Keep waiting
						setStatusMessage('Verification in progress...');
					} else {
						setStatusMessage(data.message || 'Verification failed. Please try again.');
						setLoading(false);
						clearInterval(intervalId);
					}
				}
			} catch (error) {
				console.error('Error verifying email:', error);
				setStatusMessage('An error occurred. Retrying...');
			}
		}, 5000);

		return () => clearInterval(intervalId);
	}, [token, userId]);

	const handleContinue = () => {
		router.push('/auth/sign-in');
	};

	return (
		<AuthFormWrapper>
			<Box mb={10}>
				<BluewaveLogo
					width={248}
					height={64}
				/>
			</Box>

			<Typography
				variant='h2'
				my={10}>
				{statusMessage}
			</Typography>

			<Typography
				variant='subtitle2'
				textAlign='center'>
				{isVerified
					? 'You did it! Your account is now live. Click below and let the magic begin! 🪄✨'
					: 'If this takes too long or fails, please contact support for assistance.'}
			</Typography>

			<LoadingButton
				loading={loading && !isVerified}
				buttonText={isVerified ? 'Go to Dashboard' : 'Go to Sign In'}
				loadingText='Waiting For Verification...'
				onClick={handleContinue}
				fullWidth
			/>
		</AuthFormWrapper>
	);
}
