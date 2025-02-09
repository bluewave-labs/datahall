'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import FormInput from '@/components/FormInput';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import PasswordValidation from '@/components/PasswordValidation';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { useFormSubmission, useValidatedFormData } from '@/hooks';
import {
	passwordValidationRule,
	requiredFieldRule,
	validEmailRule,
} from '@/utils/shared/validators';

export default function SignUp() {
	const router = useRouter();

	const { values, touched, handleChange, handleBlur, getError, validateAll } = useValidatedFormData(
		{
			initialValues: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			},
			validationRules: {
				firstName: [requiredFieldRule('First name is required')],
				lastName: [requiredFieldRule('Last name is required')],
				email: [requiredFieldRule('Email is required'), validEmailRule],
				password: [
					requiredFieldRule('Password is required'),
					passwordValidationRule(8, true, true),
				],
				confirmPassword: [requiredFieldRule('Please confirm your password')],
			},
		},
	);

	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			// 1) Basic client checks
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			if (values.password !== values.confirmPassword) {
				if (values.confirmPassword) {
					toast.showToast({
						message: 'Password and confirmation password do not match.',
						variant: 'warning',
					});
				}
				return;
			}

			// 2) Attempt server call
			const res = await axios.post('/api/auth/register', {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				password: values.password,
			});

			if (res.data.success) {
				// Partial success
				if (res.data.emailFail) {
					toast.showToast({
						message:
							res.data.message ||
							'Account created, Email sending is disabled in development. Contact admin.',
						variant: 'warning',
					});
					return router.push(`/auth/account-created?userId=${res.data.userId}`);
				}

				if (res.data.token) {
					router.push(`/auth/account-created?token=${res.data.token}`);
				} else {
					toast.showToast({ message: res.data.message, variant: 'success' });
				}
			} else {
				toast.showToast({
					message: res.data.message || 'Unknown server error',
					variant: 'error',
				});
			}
		},
	});

	return (
		<AuthFormWrapper>
			<Box mb={{ sm: 8, md: 12, lg: 20 }}>
				<BluewaveLogo
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
						value={values.firstName}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={getError('firstName')}
					/>

					<FormInput
						label='Last name'
						id='lastName'
						placeholder='Enter your last name'
						value={values.lastName}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={getError('lastName')}
					/>

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
						placeholder='Create a password'
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={getError('password')}
					/>

					<FormInput
						label='Confirm password'
						id='confirmPassword'
						type='password'
						placeholder='Confirm your password'
						value={values.confirmPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={getError('confirmPassword')}
					/>
				</Box>

				{/* Real-time password strength feedback */}
				<PasswordValidation
					passwordValue={values.password}
					isBlur={touched.password}
				/>

				<LoadingButton
					loading={loading}
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
