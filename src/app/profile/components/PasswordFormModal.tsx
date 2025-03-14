import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import {
	Box,
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

export default function PasswordFormModal({ open, toggleModal }: PasswordFormModalProps) {
	const { data: session } = useSession();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState({
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
					width={56}
					height={56}
					border={1}
					borderColor='border.light'
					display='flex'
					justifyContent='center'
					alignItems='center'
					boxShadow='0px 1px 2px 0px #1018280D'
					borderRadius={5}
					mr={10}>
					<LockIcon
						width={25}
						height={25}
					/>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					gap={5}>
					<Typography variant='h2'>Change password</Typography>
					<Typography variant='body1'>Enter your current password</Typography>
				</Box>
			</DialogTitle>

			<Divider sx={{ mb: 2 }} />

			<DialogContent>
				<Grid
					container
					columnSpacing={{ sm: 2, md: 4, lg: 8 }}
					rowSpacing={14}
					alignItems='center'>
					{/* Current password */}
					<Grid size={4}>
						<Typography variant='h4'>Current password</Typography>
					</Grid>
					<Grid size={7}>
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
						<IconButton
							onClick={() => {
								setIsPasswordVisible((prevIsPasswordVisible) => ({
									...prevIsPasswordVisible,
									currentPassword: !prevIsPasswordVisible.currentPassword,
								}));
							}}>
							{isPasswordVisible.currentPassword ? <EyeOffIcon /> : <EyeIcon />}
						</IconButton>
					</Grid>

					{/* Divider */}
					<Grid size={12}>
						<Divider />
					</Grid>

					{/* New password */}
					<Grid size={4}>
						<Typography variant='h4'>New password</Typography>
					</Grid>
					<Grid size={7}>
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
						<IconButton
							onClick={() => {
								setIsPasswordVisible((prevIsPasswordVisible) => ({
									...prevIsPasswordVisible,
									newPassword: !prevIsPasswordVisible.newPassword,
								}));
							}}>
							{isPasswordVisible.newPassword ? <EyeOffIcon /> : <EyeIcon />}
						</IconButton>
					</Grid>

					{/* Confirm password */}
					<Grid size={4}>
						<Typography variant='h4'>Confirm password</Typography>
					</Grid>
					<Grid size={7}>
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
						<IconButton
							onClick={() => {
								setIsPasswordVisible((prevIsPasswordVisible) => ({
									...prevIsPasswordVisible,
									confirmPassword: !prevIsPasswordVisible.confirmPassword,
								}));
							}}>
							{isPasswordVisible.confirmPassword ? <EyeOffIcon /> : <EyeIcon />}
						</IconButton>
					</Grid>

					{/* Real-time password strength feedback */}
					<Grid
						size={8}
						offset={'auto'}>
						<PasswordValidation
							passwordValue={values.newPassword}
							isBlur={touched.newPassword}
						/>
					</Grid>
				</Grid>
			</DialogContent>

			<Divider sx={{ mb: 7, mt: 10 }} />

			<DialogActions sx={{ mx: 8, mb: 7 }}>
				{/* Confirm button */}
				<LoadingButton
					loading={loading}
					buttonText='Confirm'
					loadingText='Confirming...'
				/>
			</DialogActions>
		</Dialog>
	);
}
