// Client/src/app/auth/reset-password/page.tsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import LockIcon from '../../../../public/assets/icons/auth/LockIcon';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthInput from '../components/AuthInput';
import PasswordValidation from '../components/PasswordValidation';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';

import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { useAuthForm } from '@/hooks/useAuthForm';
import {
	requiredFieldRule,
	minLengthRule,
	// hasSpecialCharRule, // if desired
} from '@/utils/shared/validators';

export default function ResetPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token');
	const email = searchParams.get('email');

	// 1) Manage local form state
	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationRules: {
			password: [
				requiredFieldRule('Password is required'),
				minLengthRule(8, 'Password must be at least 8 characters'),
				// hasSpecialCharRule,
			],
			confirmPassword: [requiredFieldRule('Confirm password is required')],
		},
	});

	// 2) Submission logic with `useAuthForm`
	const { loading, handleSubmit } = useAuthForm({
		onSubmit: async () => {
			// Validate local fields
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}
			if (values.password !== values.confirmPassword) {
				throw new Error('Passwords do not match.');
			}

			// Server call: reset the password
			await axios.post('/api/auth/resetPassForm', {
				email,
				password: values.password,
				token,
			});

			// If successful, redirect to the "password-reset-confirm" page
			router.push(
				`/auth/password-reset-confirm?email=${email}&password=${encodeURIComponent(
					values.password,
				)}`,
			);
		},
		successMessage: '',
	});

	// 3) Render
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
				gap={8}>
				<AuthInput
					label='Password'
					id='password'
					type='password'
					placeholder='Create a password'
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('password')}
				/>

				<AuthInput
					label='Confirm Password'
					id='confirmPassword'
					type='password'
					placeholder='Confirm your password'
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('confirmPassword')}
				/>

				{/* Real-time password strength (optional). Uses getPasswordChecks internally. */}
				<PasswordValidation passwordValue={values.password} />

				<LoadingButton
					loading={loading}
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
