import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';

import {
	Box,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';

import CustomAccordion from './CustomAccordion';
import LinkDetailsAccordion from './LinkDetailsAccordion';
import SharingOptionsAccordion from './SharingOptionsAccordion';
import LoadingButton from '@/components/LoadingButton';

import { useDocumentDetail, useFormSubmission, useValidatedFormData } from '@/hooks';

import { LinkFormValues } from '@/shared/models/models';
import { computeExpirationDays } from '@/shared/utils/utils';
import { minLengthRule } from '@/shared/utils/validators';

interface CreateLinkProps {
	open: boolean;
	documentId: string;
	onClose: (action: string, createdLink?: string) => void;
}

export default function CreateLink({ open, documentId, onClose }: CreateLinkProps) {
	const [expanded, setExpanded] = useState<string | false>('');
	const [expirationType, setExpirationType] = useState('days');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// Validation for password length
	const validationRules = {
		password: [minLengthRule(5, 'Password must be at least 5 characters long.')],
	};

	const initialFormValues: LinkFormValues = {
		friendlyName: '',
		isPublic: true,
		otherEmails: '',
		expirationTime: '',
		requirePassword: false,
		expirationEnabled: false,
		requireUserDetails: false,
		requiredUserDetailsOption: 1,
	};

	const { values, setValues, validateAll, getError, handleBlur } =
		useValidatedFormData<LinkFormValues>({
			initialValues: initialFormValues,
			validationRules,
		});

	const document = useDocumentDetail(documentId);

	const handleInputChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value, type, checked } = event.target;

			// If user sets expirationDays
			if (name === 'expirationDays') {
				const days = parseInt(value, 10);
				if (!isNaN(days)) {
					const date = new Date();
					date.setUTCDate(date.getUTCDate() + days);
					setValues((prev) => ({
						...prev,
						expirationTime: date.toISOString(),
						expirationDays: days.toString(),
					}));
				} else {
					setValues((prev) => ({ ...prev, expirationDays: '' }));
				}
				return;
			}

			// If user sets expirationDate
			if (name === 'expirationDate') {
				const date = new Date(value);
				setValues((prev) => ({
					...prev,
					expirationTime: date.toISOString(),
					expirationDate: value,
				}));
				return;
			}

			if (name === 'isPublic') {
				const newVal = type === 'checkbox' ? checked : value === 'true';
				if (newVal) {
					setValues((prev) => ({
						...prev,
						isPublic: true,
						requireUserDetails: false,
						requiredUserDetailsOption: 1,
						requirePassword: false,
					}));
				} else {
					setValues((prev) => ({
						...prev,
						isPublic: false,
					}));
				}
				return;
			}

			setValues((prev) => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value,
			}));
		},
		[setValues],
	);

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	React.useEffect(() => {
		if (values.expirationTime) {
			const diffDays = computeExpirationDays(values.expirationTime);
			setValues((prev) => ({
				...prev,
				expirationDays: diffDays.toString(),
			}));
		}
	}, [values.expirationTime, setValues]);

	const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setExpirationType(e.target.value);
	};

	function buildRequestPayload(): Record<string, any> {
		const payload: Record<string, any> = {
			documentId,
			isPublic: values.isPublic,
			friendlyName: values.friendlyName,
		};
		if (values.requireUserDetails) {
			payload.requiredUserDetailsOption = values.requiredUserDetailsOption;
		}
		if (values.requirePassword) {
			payload.password = values.password;
		}
		if (values.expirationEnabled) {
			payload.expirationTime = values.expirationTime;
		}
		return payload;
	}

	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct any errors before generating a link.');
			}

			const payload = buildRequestPayload();
			const response = await axios.post(`/api/documents/${documentId}/links`, payload);

			if (!response.data?.link?.linkUrl) {
				throw new Error(response.data?.error || 'No link returned by server.');
			}

			onClose('Form submitted', response.data.link.linkUrl);
		},
		onSuccess: () => {
			toast.showToast({
				message: 'Shareable link created successfully!',
				variant: 'success',
			});
		},
		onError: (errMsg) => {
			console.error('Create link error:', errMsg);
		},
	});

	function handleCancel() {
		onClose('cancelled');
	}

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			component='form'
			onSubmit={handleSubmit}
			fullWidth
			maxWidth='sm'>
			<DialogTitle variant='h2'>
				Create shareable link
				<Typography
					my={4}
					component='div'
					variant='body2'>
					Selected Document:{' '}
					<Chip
						sx={{
							backgroundColor: 'alert.info',
							borderRadius: 50,
							verticalAlign: 'baseline',
						}}
						size='small'
						label={document.document?.fileName}
					/>
				</Typography>
			</DialogTitle>

			<DialogContent sx={{ overflowY: 'auto' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<LinkDetailsAccordion
						formValues={values}
						handleInputChange={handleInputChange}
					/>

					<CustomAccordion
						title='Sharing Options'
						expanded={expanded === 'sharing-options'}
						onChange={handleChange('sharing-options')}>
						<SharingOptionsAccordion
							getError={getError}
							formValues={values}
							handleBlur={handleBlur}
							handleInputChange={handleInputChange}
							isPasswordVisible={isPasswordVisible}
							setIsPasswordVisible={setIsPasswordVisible}
							expirationType={expirationType}
							handleExpirationChange={handleExpirationChange}
						/>
					</CustomAccordion>
				</Box>
			</DialogContent>

			<DialogActions sx={{ p: 16 }}>
				<LoadingButton
					loading={loading}
					buttonText='Generate'
					loadingText='Generating...'
					fullWidth
					type='submit'
				/>
			</DialogActions>
		</Dialog>
	);
}
