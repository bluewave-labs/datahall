'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import FormInput from '../../../components/FormInput';
import AuthFormWrapper from '../components/AuthFormWrapper';

import { KeyIcon } from '@/../public/assets/icons';

import { useFormSubmission, useToast, useValidatedFormData } from '@/hooks';
import { requiredFieldRule, validEmailRule } from '@/utils/shared/validators';

export default function ForgotPassword() {
	const router = useRouter();
	const { showToast } = useToast();

	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
		initialValues: {
			email: '',
		},
		validationRules: {
			email: [requiredFieldRule('Email is required'), validEmailRule],
		},
	});

	const { loading, handleSubmit } = useFormSubmission({
		onSubmit: async () => {
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			const response = await axios.post('/api/auth/resetPass', {
				email: values.email,
			});

			router.push(response.data.url);
		},

		successMessage: '',
		onError: (message) => {
			if (message.includes('Email not found')) {
				showToast({
					message: 'Email not found. Please try again or sign up.',
					variant: 'error',
				});
			}
		},
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
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('email')}
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
						loadingText='Verifying Email...'
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
