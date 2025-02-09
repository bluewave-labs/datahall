'use client';

import { Box, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import CustomCheckbox from '@/components/CustomCheckbox';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import FormInput from '../../../components/FormInput';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { useFormSubmission, useValidatedFormData } from '@/hooks';
import { requiredFieldRule } from '@/utils/shared/validators';

export default function SignIn() {
	const router = useRouter();

	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
		initialValues: {
			email: '',
			password: '',
			remember: false,
		},
		validationRules: {
			email: [requiredFieldRule('Email is required.')],
			password: [requiredFieldRule('Password is required.')],
		},
	});

	const { loading, handleSubmit } = useFormSubmission({
		onSubmit: async () => {
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}
			const result = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
				remember: values.remember.toString(),
			});
			if (result?.error) {
				throw new Error(result.error);
			}
			router.push('/documents');
		},
		successMessage: 'Successfully signed in! Redirecting...',
	});

	return (
		<AuthFormWrapper>
			<Box my={{ sm: 8, md: 12, lg: 20 }}>
				<BluewaveLogo
					width={248}
					height={64}
				/>
			</Box>

			<Typography
				variant='h2'
				mb={{ sm: 10, md: 12, lg: 15 }}>
				Sign in to your account
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={5}>
				<Box
					display='flex'
					gap={{ sm: 8, md: 9, lg: 10 }}
					flexDirection='column'>
					<FormInput
						label='Email'
						id='email'
						type='email'
						placeholder='your_email@bluewave.ca'
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={getError('email')}
					/>

					<FormInput
						label='Password'
						id='password'
						type='password'
						placeholder='••••••••••••••'
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={getError('password')}
					/>
				</Box>

				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mt={8}
					mb={5}>
					<CustomCheckbox
						checked={values.remember}
						onChange={handleChange}
						name='remember'
						label='Remember for 30 days'
					/>
					<NavLink
						href='/auth/forgot-password'
						linkText='Forgot password?'
						prefetch
					/>
				</Box>

				<LoadingButton
					loading={loading}
					buttonText='Sign in'
					loadingText='Signing in...'
				/>
			</Box>

			<Typography
				variant='body1'
				mt={50}>
				Don&apos;t have an account?{' '}
				<NavLink
					href='/auth/sign-up'
					linkText='Sign up'
					ml={1}
					display='inline-flex'
					prefetch
				/>
			</Typography>
		</AuthFormWrapper>
	);
}
