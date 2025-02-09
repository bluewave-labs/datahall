'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { CheckCircleIcon } from '@/../public/assets/icons';

import LoadingButton from '@/components/LoadingButton';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function PasswordResetConfirm() {
	const [loading, setLoading] = useState(false);
	const [signedIn, setSignedIn] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	const email = searchParams.get('email');
	const password = searchParams.get('password');

	// Attempt sign-in
	const handleSignIn = async () => {
		setLoading(true);

		if (email && password) {
			const signInResult = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			if (signInResult?.error) {
				console.error('Sign-in failed:', signInResult.error);
			} else {
				setSignedIn(true);
			}
		}

		setLoading(false);
	};

	// If sign-in is successful, redirect to /documents
	useEffect(() => {
		if (signedIn) {
			router.push('/documents');
		}
	}, [signedIn, router]);

	return (
		<AuthFormWrapper>
			<Box
				width={56}
				height={56}
				border='1px solid #EAECF0'
				display='flex'
				justifyContent='center'
				boxShadow='0px 1px 2px 0px #1018280D'
				alignItems='center'
				borderRadius='12px'>
				<CheckCircleIcon
					color='outline'
					width={28}
					height={28}
				/>
			</Box>

			<Typography
				variant='h2'
				my={10}>
				Password Reset Successfully!
			</Typography>

			<Typography
				variant='subtitle2'
				textAlign='center'>
				Your password has been successfully reset. Click below to log in magically.
			</Typography>

			<LoadingButton
				loading={loading}
				buttonText='Sign In'
				loadingText='Signing In...'
				onClick={handleSignIn}
				fullWidth
			/>
		</AuthFormWrapper>
	);
}
