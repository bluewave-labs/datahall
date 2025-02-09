import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Avatar, Box, Button, Divider, Link, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import FormInput from '@/components/FormInput';
import LoadingButton from '@/components/LoadingButton';
import ModalWrapper from '@/components/ModalWrapper';
import LoadingSpinner from '@/components/LoadingSpinner';

import { PencilIcon } from '@/../public/assets/icons';

import { useFormSubmission, useModal, useToast, useValidatedFormData } from '@/hooks';
import { requiredFieldRule } from '@/utils/shared/validators';

export default function ProfileForm() {
	const [fetchLoading, setFetchLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const deleteAccountModal = useModal();
	const deletePhotoModal = useModal();
	const uploadModal = useModal();

	const { showToast } = useToast();
	const { data: session } = useSession();

	const { values, setValues, handleChange, getError, validateAll } = useValidatedFormData({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			// image: '',
		},
		validationRules: {
			firstName: [requiredFieldRule('First name is required')],
			lastName: [requiredFieldRule('Last name is required')],
		},
	});

	// Fetch data
	useEffect(() => {
		const fetchProfileData = async () => {
			setFetchLoading(true);
			try {
				const response = await axios.get('/api/profile');
				setValues(response.data);
			} catch (error) {
				console.error('Error loading profile data:', error);
				setError('Failed to load profile data! Please try again later.');
			} finally {
				setFetchLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	// Submit data
	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			// Basic client checks
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			if (values.firstName && values.lastName) {
				try {
					// Make the POST request
					const response = await axios.post('/api/profile/changeName', {
						email: session?.user.email,
						firstName: values.firstName,
						lastName: values.lastName,
						// image: values.image,
					});
					// Handle success
					if (response.status === 200) {
						toast.showToast({
							message: 'Profile updated successfully!',
							variant: 'success',
						});
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
			}
		},
	});

	const handleDeleteAccount = () => {
		console.log('Account deleted!');
		showToast({
			message: 'Account deleted!',
			variant: 'error',
		});
	};

	const handleDeletePhoto = () => {
		console.log('Photo deleted!');
		showToast({
			message: 'Photo deleted!',
			variant: 'error',
		});
	};

	const handleUpdatePhoto = () => {
		console.log('Picture updated successfully!');
		showToast({
			message: 'Picture updated successfully!',
			variant: 'success',
		});
	};

	if (fetchLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'>
				<Typography color='error'>{error}</Typography>
			</Box>
		);
	}

	return (
		<>
			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				autoComplete='off'>
				<Grid
					container
					rowSpacing={14}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					alignItems='center'>
					{/* First Name */}
					<Grid size={6}>
						<Typography variant='h4'>First name</Typography>
					</Grid>
					<Grid size={6}>
						<FormInput
							id='firstName'
							value={values.firstName}
							onChange={handleChange}
							errorMessage={getError('firstName')}
						/>
					</Grid>

					{/* Last Name */}
					<Grid size={6}>
						<Typography variant='h4'>Last name</Typography>
					</Grid>
					<Grid size={6}>
						<FormInput
							id='lastName'
							value={values.lastName}
							onChange={handleChange}
							errorMessage={getError('lastName')}
						/>
					</Grid>

					{/* Email */}
					<Grid size={6}>
						<Typography variant='h4'>Email</Typography>
						<Typography variant='subtitle1'>
							This is your current email address — it cannot be changed.
						</Typography>
					</Grid>
					<Grid size={6}>
						<FormInput
							id='email'
							type='email'
							value={values.email}
							onChange={handleChange}
							disabled={true}
						/>
					</Grid>

					{/* Photo */}
					<Grid size={6}>
						<Typography variant='h4'>Your photo</Typography>
						<Typography variant='subtitle1'>
							This photo will be displayed on your profile page.
						</Typography>
					</Grid>
					<Grid size={6}>
						<Box
							display='flex'
							alignItems='center'>
							<Box
								sx={{
									position: 'relative',
									width: 64,
									height: 64,
									borderRadius: '50%',
									overflow: 'hidden',
									'&:hover .avatar-edit-icon': {
										opacity: 1,
									},
								}}>
								<Avatar
									alt='Profile picture'
									src='https://picsum.photos/200/200'
									// src={values.image}
									sx={{ width: 64, height: 64, mr: 7 }}
								/>

								<Box
									className='avatar-edit-icon'
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										bgcolor: 'rgba(0, 0, 0, 0.15)',
										opacity: 0,
										transition: 'opacity 0.3s',
										cursor: 'pointer',
									}}
									onClick={uploadModal.openModal}>
									<PencilIcon
										width={20}
										height={20}
										color='white'
									/>
								</Box>
							</Box>
							<Link
								href='#'
								underline='hover'
								pl={10}
								color='text.secondary'
								onClick={deletePhotoModal.openModal}>
								Delete
							</Link>
							<Link
								href='#'
								underline='hover'
								px={8}
								onClick={uploadModal.openModal}>
								Update
							</Link>
						</Box>
					</Grid>
				</Grid>

				{/* Save Button */}
				<Box
					display='flex'
					justifyContent='flex-end'
					mt={40}>
					<LoadingButton
						loading={loading}
						buttonText='Save'
						loadingText='Saving...'
						fullWidth={false}
					/>
				</Box>

				<Divider sx={{ mb: 7, mt: 14 }} />

				{/* Delete Account Section */}
				<Box
					display='flex'
					flexDirection='column'
					mb={4}
					rowGap={6}>
					<Typography variant='h4'>Delete account</Typography>
					<Typography
						variant='subtitle1'
						mb={2}>
						Note that deleting your account will remove all data from our system. This is permanent
						and non-recoverable.
					</Typography>

					{/* Delete Account Button */}

					<Tooltip
						title='Account deletion is disabled in Development'
						placement='bottom-start'>
						<Box width='9rem'>
							<Button
								variant='contained'
								color='error'
								onClick={deleteAccountModal.openModal}
								disabled={true}>
								Delete account
							</Button>
						</Box>
					</Tooltip>
				</Box>
			</Box>

			{/* Delete Photo Modal */}
			<ModalWrapper
				variant='delete'
				title='Really delete this photo?'
				description='When you delete this photo, all the links associated with the photo will also be removed. This action is non-reversible.'
				confirmButtonText='Delete photo'
				open={deletePhotoModal.isOpen}
				onClose={handleDeletePhoto}
				toggleModal={deletePhotoModal.closeModal}
			/>

			{/* Upload Photo Modal */}
			<ModalWrapper
				variant='upload'
				title='Upload profile image'
				confirmButtonText='Update'
				open={uploadModal.isOpen}
				onClose={handleUpdatePhoto}
				maxFileSize='3 MB'
				fileFormats='JPG, PNG'
				toggleModal={uploadModal.closeModal}
			/>
			{/* Delete Account Modal */}
			<ModalWrapper
				variant='delete'
				title='Really delete this account?'
				description='If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable.'
				confirmButtonText='Delete account'
				cancelButtonText='Cancel'
				open={deleteAccountModal.isOpen}
				onClose={handleDeleteAccount}
				toggleModal={deleteAccountModal.closeModal}
			/>
		</>
	);
}
