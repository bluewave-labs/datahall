'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { BlueWaveLogo, FormInput, LoadingButton, NavLink, PasswordValidation } from '@/components';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { useFormSubmission } from '@/hooks';
import { useZodForm } from '@/hooks/useZodForm';
import { SignUpSchema, SignUpValues } from '@/shared/validation/authSchemas';

export default function SignUp() {
	const router = useRouter();

	/* ------------------------------ form state ----------------------------- */
	const form = useZodForm<SignUpValues>(SignUpSchema, {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { loading, handleSubmit, toast } = useFormSubmission({
		validate: () => form.validate(),
		onSubmit: async () => {
			const res = await axios.post('/api/auth/register', {
				firstName: form.values.firstName,
				lastName: form.values.lastName,
				email: form.values.email,
				password: form.values.password,
			});

			/* 201 = created & e-mail sent */
			if (res.status === 201) {
				toast.showToast({
					message: res.data.message ?? 'Verification e-mail sent. Check your inbox.',
					variant: 'success',
				});
				router.push('/auth/sign-in?emailSent=true');
				return;
			}
			/* 409 = e-mail already in use etc. (service returns .message) */
			toast.showToast({
				message: res.data?.message ?? 'Unable to create account',
				variant: 'error',
			});
		},
		errorMessage: 'Registration failed',
	});

	return (
		<AuthFormWrapper>
			<Box mb={{ sm: 8, md: 12, lg: 20 }}>
				<BlueWaveLogo
					width={248}
					height={64}
				/>
			</Box>

			<Typography
				variant='h2'
				mb={{ sm: 10, md: 11, lg: 12 }}>
				Create an account
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={8}>
				<Box
					display='flex'
					gap={{ sm: 8, md: 9, lg: 10 }}
					flexDirection='column'>
					<FormInput
						label='First name'
						id='firstName'
						placeholder='Enter your first name'
						value={form.values.firstName}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						errorMessage={form.getError('firstName')}
					/>

					<FormInput
						label='Last name'
						id='lastName'
						placeholder='Enter your last name'
						value={form.values.lastName}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						errorMessage={form.getError('lastName')}
					/>

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
						placeholder='Create a password'
						value={form.values.password}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						errorMessage={form.getError('password')}
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
				</Box>

				{/* Real-time password strength feedback */}
				<PasswordValidation
					passwordValue={form.values.password}
					isBlur={form.touched.password}
				/>

				<LoadingButton
					loading={loading}
					disabled={!form.isValid}
					buttonText='Get started'
					loadingText='Creating Account ...'
				/>
			</Box>

			<Box
				mt={25}
				display='flex'
				justifyContent='center'
				flexDirection='column'
				alignItems='center'
				gap={8}>
				<NavLink
					href='/auth/sign-in'
					linkText='← Back to sign in'
					prefetch
				/>
			</Box>
		</AuthFormWrapper>
	);
}
