'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { FormInput, LoadingButton, NavLink } from '@/components';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { KeyIcon } from '@/icons';

import { useFormSubmission } from '@/hooks';
import { useZodForm } from '@/hooks/useZodForm';
import { ForgotPasswordSchema, ForgotPasswordValues } from '@/shared/validation/authSchemas';

export default function ForgotPassword() {
	const router = useRouter();

	const form = useZodForm<ForgotPasswordValues>(ForgotPasswordSchema, { email: '' });

	const { loading, handleSubmit } = useFormSubmission({
		validate: () => form.validate(),
		onSubmit: async () => {
			const res = await axios.post('/api/auth/password/forgot', { email: form.values.email });

			router.push('/auth/sign-in?reset=sent');
		},

		errorMessage: 'Failed to send reset e-mail',
	});

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
				<KeyIcon />
			</Box>

			<Typography
				variant='h2'
				mb={4}>
				Forgot password?
			</Typography>

			<Typography
				variant='subtitle2'
				color='text.secondary'
				mb={4}
				textAlign='center'>
				No worries, we’ll send you reset instructions.
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={5}>
				<FormInput
					label='Email'
					id='email'
					type='email'
					placeholder='Enter your email'
					value={form.values.email}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					errorMessage={form.getError('email')}
				/>

				<Box
					mt={10}
					display='flex'
					justifyContent='center'
					flexDirection='column'
					alignItems='center'
					gap={8}>
					<LoadingButton
						loading={loading}
						buttonText='Reset password'
						loadingText='Sending reset link...'
						fullWidth
					/>

					<NavLink
						href='/auth/sign-in'
						linkText='← Back to sign in'
						prefetch
					/>
				</Box>
			</Box>
		</AuthFormWrapper>
	);
}
