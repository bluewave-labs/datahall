'use client';

import { Box, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { BlueWaveLogo, CustomCheckbox, FormInput, LoadingButton, NavLink } from '@/components';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { useAuthQueryToasts, useFormSubmission } from '@/hooks';
import { useZodForm } from '@/hooks/useZodForm';
import { SignInSchema } from '@/shared/validation/authSchemas';

export default function SignIn() {
	const router = useRouter();

	useAuthQueryToasts();

	const form = useZodForm(SignInSchema, {
		email: '',
		password: '',
		remember: false,
	});

	const { loading, handleSubmit } = useFormSubmission({
		onSubmit: async () => {
			await signIn('credentials', {
				redirect: false,
				email: form.values.email,
				password: form.values.password,
				remember: String(form.values.remember),
			}).then((r) => {
				if (r?.error) throw new Error(r.error);
				router.push('/documents');
			});
		},
		validate: () => form.validate(),
		successMessage: 'Successfully signed in! Redirecting...',
	});

	return (
		<AuthFormWrapper>
			<Box my={{ sm: 8, md: 12, lg: 20 }}>
				<BlueWaveLogo
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
						value={form.values.email}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						errorMessage={form.getError('email')}
					/>

					<FormInput
						label='Password'
						id='password'
						type='password'
						placeholder='••••••••••••••'
						value={form.values.password}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						errorMessage={form.getError('password')}
					/>
				</Box>

				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mt={8}
					mb={5}>
					<CustomCheckbox
						checked={form.values.remember}
						onChange={form.handleChange}
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
					disabled={!form.isValid}
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
