'use client';

import axios from 'axios';
import React from 'react';

import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { FormInput, LoadingButton } from '@/components';

import { useFormSubmission, useValidatedFormData } from '@/hooks';

import { EyeIcon, EyeOffIcon, FileDownloadIcon } from '@/icons';
import { requiredFieldRule, splitName, validEmailRule } from '@/shared/utils';

const RowBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: 10,
	width: '100%',
	'& > h3': {
		flex: 2,
	},
	'& > div:nth-of-type(1)': {
		flex: 7,
	},
	'& > div:nth-of-type(2)': {
		marginLeft: 0,
		flex: 1,
	},
});

function getFormConfig(passwordRequired: boolean, userDetailsOption: number) {
	const formConfig: {
		initialValues: Record<string, string>;
		validationRules: Record<string, any[]>;
	} = {
		initialValues: {},
		validationRules: {},
	};

	if (passwordRequired) {
		formConfig.initialValues.password = '';
		formConfig.validationRules.password = [requiredFieldRule('*This field is required')];
	}

	if (userDetailsOption === 1) {
		formConfig.initialValues.name = '';
		formConfig.validationRules.name = [requiredFieldRule('*This field is required')];
	}

	if (userDetailsOption === 2) {
		formConfig.initialValues.name = '';
		formConfig.initialValues.email = '';
		formConfig.validationRules.name = [requiredFieldRule('*This field is required')];
		formConfig.validationRules.email = [
			requiredFieldRule('*This field is required'),
			validEmailRule,
		];
	}

	return formConfig;
}

interface FileAccessModalProps {
	linkId: string;
	passwordRequired: boolean;
	userDetailsOption: number;
	onFileAccessModalSubmit: (data: Record<string, any>) => void;
}

export default function FileAccessModal({
	linkId,
	passwordRequired,
	userDetailsOption,
	onFileAccessModalSubmit,
}: FileAccessModalProps) {
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const formConfig = getFormConfig(passwordRequired, userDetailsOption);

	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
		initialValues: formConfig.initialValues,
		validationRules: formConfig.validationRules,
	});

	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			const splittedName = splitName(values.name);

			const payload = {
				linkId,
				first_name: splittedName.first_name,
				last_name: splittedName.last_name,
				email: values.email || '',
				password: values.password || '',
			};

			const response = await axios.post(`/api/public_links/${linkId}/access`, payload);

			if (!response.data.data) {
				throw new Error(response.data.message || 'No file data returned.');
			}

			onFileAccessModalSubmit(response.data.data);
		},

		successMessage: 'File access granted!',
	});

	return (
		<Dialog
			open
			onClose={() => {}}
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
				sx: { minWidth: 600, p: 0 },
			}}>
			{/* Header */}
			<Box
				display='flex'
				alignItems='center'
				m={12}>
				<Box
					borderRadius={2}
					p={5}
					border={1}
					borderColor='border.light'>
					<FileDownloadIcon />
				</Box>
				<Box ml={6}>
					<Typography variant='h2'>Your information</Typography>
					<Typography variant='body1'>Enter your details to access the document</Typography>
				</Box>
			</Box>

			<Divider />

			{/* Form Fields */}
			<DialogContent sx={{ m: 12 }}>
				<Box
					display='flex'
					flexDirection='column'
					width='100%'
					gap={10}>
					{[1, 2].includes(userDetailsOption) && (
						<RowBox>
							<Typography variant='h3'>Name</Typography>
							<FormInput
								id='name'
								value={values.name || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								errorMessage={getError('name')}
								placeholder='Your Name'
							/>
							<Box />
						</RowBox>
					)}

					{userDetailsOption === 2 && (
						<RowBox>
							<Typography variant='h3'>Email</Typography>
							<FormInput
								id='email'
								type='email'
								value={values.email || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								errorMessage={getError('email')}
								placeholder='your_email@bluewave.com'
							/>
							<Box />
						</RowBox>
					)}

					{userDetailsOption === 2 && passwordRequired && <Divider />}

					{passwordRequired && (
						<RowBox>
							<Typography
								variant='h3'
								mt={10}>
								Password
							</Typography>
							<FormInput
								placeholder=''
								id='password'
								label='Please enter the password shared with you'
								value={values.password || ''}
								onChange={handleChange}
								errorMessage={getError('password')}
								onBlur={handleBlur}
								type={isPasswordVisible ? 'text' : 'password'}
							/>
							<Box mt={10}>
								<IconButton
									size='large'
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
									{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
								</IconButton>
							</Box>
						</RowBox>
					)}
				</Box>
			</DialogContent>

			<Divider />

			{/* Submit Button */}
			<DialogActions sx={{ p: 0, m: 12 }}>
				<LoadingButton
					loading={loading}
					buttonText='Confirm'
					loadingText='Confirming...'
					fullWidth
					type='submit'
				/>
			</DialogActions>
		</Dialog>
	);
}
