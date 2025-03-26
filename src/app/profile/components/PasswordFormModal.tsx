import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { FormInput, LoadingButton, PasswordValidation } from '@/components';

import { useFormSubmission, useValidatedFormData } from '@/hooks';
import { passwordValidationRule, requiredFieldRule } from '@/shared/utils';
import { EyeIcon, EyeOffIcon, LockIcon } from '@/icons';

interface PasswordFormModalProps {
	open: boolean;
	toggleModal: () => void;
}

type PasswordFields = 'currentPassword' | 'newPassword' | 'confirmPassword';

export default function PasswordFormModal({ open, toggleModal }: PasswordFormModalProps) {
	const { data: session } = useSession();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<Record<PasswordFields, boolean>>({
		currentPassword: false,
		newPassword: false,
		confirmPassword: false,
	});

	const { values, setValues, touched, handleChange, handleBlur, getError, validateAll } =
		useValidatedFormData({
			initialValues: {
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			},
			validationRules: {
				currentPassword: [requiredFieldRule('Current password is required')],
				newPassword: [
					requiredFieldRule('New password is required'),
					passwordValidationRule(8, true, true),
				],
				confirmPassword: [requiredFieldRule('Please confirm your password')],
			},
		});

	// Submit data
	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			// Basic client checks
			const hasError = validateAll();
			if (hasError || !values.currentPassword || !values.newPassword || !values.confirmPassword) {
				throw new Error('Please correct the highlighted fields.');
			}

			if (values.newPassword !== values.confirmPassword) {
				if (values.confirmPassword) {
					toast.showToast({
						message: 'New password and confirmation password do not match.',
						variant: 'warning',
					});
				}
				return;
			}

			try {
				// Make the POST request
				const response = await axios.post('/api/profile/changePassword', {
					email: session?.user.email,
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
				});

				// Handle success
				if (response.status === 200) {
					toast.showToast({
						message: 'Password updated successfully!',
						variant: 'success',
					});
					setIsSubmitted(true);
					setValues((prevValues) => ({
						...prevValues,
						currentPassword: '',
						newPassword: '',
						confirmPassword: '',
					}));
					toggleModal();
				}
			} catch (error: unknown) {
				// Narrowing down the type of `error`
				if (axios.isAxiosError(error)) {
					// Axios-specific error handling
					if (error.response) {
						// Server responded with an error
						toast.showToast({
							message: `Error: ${error.response.data.error}!`,
							variant: 'error',
						});
					} else if (error.request) {
						// No response received
						toast.showToast({
							message: 'Error: No response from server! Please try again later.',
							variant: 'error',
						});
					} else {
						// Other Axios error
						toast.showToast({
							message: `Error: ${error.message}!`,
							variant: 'error',
						});
					}
				} else if (error instanceof Error) {
					// Generic error handling
					toast.showToast({
						message: `Error: ${error.message}!`,
						variant: 'error',
					});
				} else {
					// Fallback for unknown error types
					toast.showToast({
						message: 'An unexpected error occurred!',
						variant: 'error',
					});
				}
			}
		},
	});

	const togglePasswordVisibility = (field: PasswordFields) => {
		setIsPasswordVisible((prevIsPasswordVisible) => ({
			...prevIsPasswordVisible,
			[field]: !prevIsPasswordVisible[field],
		}));
	};

	return (
		<Dialog
			component='form'
			open={open}
			onClose={toggleModal}
			onSubmit={handleSubmit}
			fullWidth
			maxWidth='sm'>
			<DialogTitle display={'flex'}>
				<Box
					width={45}
					height={45}
					border={1}
					borderColor='border.light'
					display='flex'
					justifyContent='center'
					alignItems='center'
					boxShadow='0px 1px 2px 0px #1018280D'
					borderRadius={5}
					mr={5}>
					<LockIcon
						width={25}
						height={25}
					/>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					gap={1}>
					<Typography variant='h2'>Change Password</Typography>
					<Typography variant='body1'>Enter your current password</Typography>
				</Box>
			</DialogTitle>

			<Divider sx={{ mb: 2 }} />

			<DialogContent>
				<Grid
					container
					columnSpacing={{ sm: 2, md: 4, lg: 6 }}
					rowSpacing={8}
					alignItems='center'>
					{/* Current password */}
					<Grid size={3}>
						<Typography variant='h4'>Current Password</Typography>
					</Grid>
					<Grid size={8}>
						<FormInput
							id='currentPassword'
							type={isPasswordVisible.currentPassword ? 'text' : 'password'}
							value={values.currentPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							errorMessage={!isSubmitted ? getError('currentPassword') : undefined}
						/>
					</Grid>
					<Grid size={1}>
						<IconButton onClick={() => togglePasswordVisibility('currentPassword')}>
							{isPasswordVisible.currentPassword ? <EyeOffIcon /> : <EyeIcon />}
						</IconButton>
					</Grid>

					{/* New password */}
					<Grid size={3}>
						<Typography variant='h4'>New Password</Typography>
					</Grid>
					<Grid size={8}>
						<FormInput
							id='newPassword'
							type={isPasswordVisible.newPassword ? 'text' : 'password'}
							value={values.newPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							errorMessage={!isSubmitted ? getError('newPassword') : undefined}
						/>
					</Grid>
					<Grid size={1}>
						<IconButton onClick={() => togglePasswordVisibility('newPassword')}>
							{isPasswordVisible.newPassword ? <EyeOffIcon /> : <EyeIcon />}
						</IconButton>
					</Grid>

					{/* Confirm password */}
					<Grid size={3}>
						<Typography variant='h4'>Confirm Password</Typography>
					</Grid>
					<Grid size={8}>
						<FormInput
							id='confirmPassword'
							type={isPasswordVisible.confirmPassword ? 'text' : 'password'}
							value={values.confirmPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							errorMessage={!isSubmitted ? getError('confirmPassword') : undefined}
						/>
					</Grid>
					<Grid size={1}>
						<IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
							{isPasswordVisible.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
						</IconButton>
					</Grid>

					{/* Real-time password strength feedback */}
					<Grid
						size={9}
						offset={'auto'}>
						<PasswordValidation
							passwordValue={values.newPassword}
							isBlur={touched.newPassword}
						/>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions sx={{ mx: 5, my: 5 }}>
				{/* Confirm button */}
				<Button
					variant='outlined'
					color='secondary'
					size='small'
					onClick={toggleModal}>
					Cancel
				</Button>
				<LoadingButton
					loading={loading}
					buttonText='Confirm'
					size='small'
					loadingText='Confirming...'
					fullWidth={false}
				/>
			</DialogActions>
		</Dialog>
	);
}
