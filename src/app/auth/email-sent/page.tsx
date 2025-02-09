'use client';
import NavLink from '@/components/NavLink';
import { Box, Container, Link, Typography } from '@mui/material';

import NextLink from 'next/link';
import { FormEvent, useState } from 'react';

import { MailIcon } from '@/../public/assets/icons';

export default function EmailSent() {
	const [email, setEmail] = useState('your_email@bluewave.ca');
	const [resending, setResending] = useState(false);
	const [resendSuccess, setResendSuccess] = useState(false);

	const handleResendEmail = (event: FormEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		setResending(true);
		// Simulate resending reset email
		setTimeout(() => {
			setResending(false);
			setResendSuccess(true);
		}, 5000); // Mock API delay
	};

	return (
		<Container
			component='main'
			sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
				mt={8}
				gap={10}>
				<Box
					width={56}
					height={56}
					border='1px solid #EAECF0'
					display='flex'
					justifyContent='center'
					boxShadow='0px 1px 2px 0px #1018280D'
					alignItems='center'
					borderRadius='12px'>
					<MailIcon />
				</Box>

				<Typography
					variant='h2'
					my={10}>
					Check your email
				</Typography>

				<Typography
					variant='subtitle2'
					textAlign='center'
					mb={4}>
					We sent a password reset link to <strong>{email}</strong>
				</Typography>

				<Typography variant='body1'>
					Didn’t receive the email?{' '}
					<Link
						href='#'
						color={resending ? 'text.notes' : 'text.brand'}
						onClick={!resending ? handleResendEmail : undefined}
						underline='hover'
						sx={{ cursor: resending ? 'not-allowed' : 'pointer' }}>
						{resending ? 'Resending...' : 'Click to resend'}
					</Link>
				</Typography>

				<NavLink
					href='/auth/sign-in'
					linkText='← Back to sign in'
					prefetch={true}
				/>

				{resendSuccess && (
					<Typography
						variant='body1'
						color='success.main'
						mt={4}>
						A reset email has been sent again to {email}.
					</Typography>
				)}
				{/* Temporary Link to reset Password */}
				<NextLink
					href='/auth/reset-password'
					passHref>
					<Typography>Password Reset</Typography>
				</NextLink>
			</Box>
		</Container>
	);
}
