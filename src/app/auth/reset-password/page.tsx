'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import { FormInput, LoadingButton, NavLink, PasswordValidation } from '@/components';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { LockIcon } from '@/icons';

import { useFormSubmission, useToast } from '@/hooks';
import { useZodForm } from '@/hooks/useZodForm';
import { ResetPasswordFormSchema, ResetPasswordFormValues } from '@/shared/validation/authSchemas';
import { useEffect } from 'react';

export default function ResetPassword() {
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get('token') ?? '';
	const toast = useToast();

	useEffect(() => {
		if (!token) {
			toast.showToast({ message: 'Reset link is invalid or expired', variant: 'error' });
			router.replace('/auth/forgot-password');
		}
	}, [token, router, toast]);

	const form = useZodForm<ResetPasswordFormValues>(ResetPasswordFormSchema, {
		newPassword: '',
		confirmPassword: '',
	});

	const { loading, handleSubmit } = useFormSubmission({
		validate: () => form.validate(),
		onSubmit: async () => {
			await axios.post('/api/auth/password/reset', {
				token,
				newPassword: form.values.newPassword,
				confirmPassword: form.values.confirmPassword,
			});
			router.push('/auth/sign-in?reset=done');
		},
		errorMessage: 'Could not reset password',
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
				<LockIcon />
			</Box>

			<Typography
				variant='h2'
				mb={4}>
				Set new password
			</Typography>

			<Typography
				variant='subtitle2'
				mb={4}
				textAlign='center'>
				Your new password must be different from previously used passwords.
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={{ sm: 8, md: 9, lg: 10 }}>
				<FormInput
					label='New Password'
					id='newPassword'
					type='password'
					placeholder='Create a password'
					value={form.values.newPassword}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					errorMessage={form.getError('newPassword')}
				/>

				<FormInput
					label='Confirm password'
					id='confirmPassword'
					type='password'
					placeholder='Confirm your password'
					value={form.values.confirmPassword}
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					errorMessage={form.getError('confirmPassword')}
				/>

				<PasswordValidation
					passwordValue={form.values.newPassword}
					isBlur={form.touched.newPassword}
				/>

				<LoadingButton
					loading={loading}
					disabled={!form.isValid}
					buttonText='Reset password'
					loadingText='Resetting Password...'
				/>
			</Box>

			<NavLink
				href='/auth/sign-in'
				linkText='← Back to sign in'
				prefetch
			/>
		</AuthFormWrapper>
	);
}
