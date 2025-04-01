import axios from 'axios';
import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';

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
import SendingAccordion from './SendingAccordion';

import { LoadingButton } from '@/components';

import { useCreateLink, useDocumentDetail, useFormSubmission, useValidatedFormData } from '@/hooks';

import {
	CreateDocumentLinkPayload,
	InviteRecipientsPayload,
	LinkFormValues,
} from '@/shared/models';
import {
	computeExpirationDays,
	minLengthRule,
	sortFields,
	validateEmails,
	validateEmailsRule,
} from '@/shared/utils';
import { visitorFieldsConfig } from '@/shared/config/visitorFieldsConfig';

interface CreateLinkProps {
	open: boolean;
	documentId: string;
	onClose: (action: string, createdLink?: string) => void;
}

export default function CreateLink({ open, documentId, onClose }: CreateLinkProps) {
	const [expanded, setExpanded] = useState<string | false>('');
	const [expirationType, setExpirationType] = useState('days');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const { mutateAsync: createLink, isPending } = useCreateLink();

	const { mutate: createdLink } = useCreateLink();

	// Validation for password length and emails
	const validationRules = {
		password: [minLengthRule(5, 'Password must be at least 5 characters long.')],
		otherEmails: [validateEmailsRule()],
	};

	const initialFormValues: LinkFormValues = {
		alias: '',
		isPublic: true,
		requireUserDetails: false,
		visitorFields: [],
		requirePassword: false,
		password: '',
		expirationEnabled: false,
		expirationTime: '',
		contactEmails: [],
		selectFromContact: false,
		otherEmails: '',
		sendToOthers: false,
	};

	const { values, setValues, validateAll, getError, handleBlur } =
		useValidatedFormData<LinkFormValues>({
			initialValues: initialFormValues,
			validationRules,
		});

	const document = useDocumentDetail(documentId);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
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
						requirePassword: false,
						expirationEnabled: false,
						sendToOthers: false,
						selectFromContact: false,
						visitorFields: [],
						password: '',
						expirationTime: '',
						contactEmails: [],
						otherEmails: '',
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

	const handleVisitorFieldChange = (fields: string[]) => {
		const sortedFields = sortFields(fields, visitorFieldsConfig);
		setValues((prevValues) => ({ ...prevValues, visitorFields: sortedFields }));
	};

	useEffect(() => {
		if (values.expirationTime) {
			const diffDays = computeExpirationDays(values.expirationTime);
			setValues((prev) => ({
				...prev,
				expirationDays: diffDays.toString(),
			}));
		}
	}, [values.expirationTime, setValues]);

	const handleExpirationChange = (e: ChangeEvent<HTMLInputElement>) => {
		setExpirationType(e.target.value);
	};

	function buildRequestPayload(): CreateDocumentLinkPayload {
		return {
			documentId,
			alias: values.alias,
			isPublic: values.isPublic,
			expirationTime:
				values.expirationEnabled && values.expirationTime ? values.expirationTime : undefined,
			expirationEnabled: values.expirationEnabled,
			requirePassword: values.requirePassword,
			password: values.requirePassword ? values.password : undefined,
			requireUserDetails: values.requireUserDetails,
			visitorFields: values.requireUserDetails ? values.visitorFields : undefined,
			contactEmails: values.selectFromContact ? values.contactEmails : undefined,
			selectFromContact: values.selectFromContact,
			otherEmails: values.sendToOthers ? values.otherEmails : undefined,
			sendToOthers: values.sendToOthers,
		};
	}

	const handleSendInvites = async (linkUrl: string) => {
		const validContactEmails =
			values.contactEmails?.map((email) => {
				return email.label;
			}) || [];
		const validOtherEmails = validateEmails(values.otherEmails || '').validEmails;
		const recipients = [...validContactEmails, ...validOtherEmails];

		if (recipients.length === 0) {
			throw new Error('No valid email addresses provided.');
		}

		// Define payload using InviteRecipientsPayload
		const payload: InviteRecipientsPayload = {
			linkUrl,
			recipients,
		};

		try {
			// TODO: This API route does not currently exist, but it may be implemented in the future.
			const response = await axios.post(`/api/documents/${documentId}/links/email`, payload);

			// Handle success
			if (response.status === 200) {
				toast.showToast({
					message: 'Invites sent successfully!',
					variant: 'success',
				});
			}
		} catch (error) {
			console.error('Email sending failed:', error);

			toast.showToast({
				message: 'Failed to send invites. Please try again later.',
				variant: 'error',
			});
		}
	};

	const {
		loading: formLoading,
		handleSubmit,
		toast,
	} = useFormSubmission({
		onSubmit: async () => {
			const hasError = !values.password && !values.otherEmails ? false : validateAll();
			if (hasError) {
				throw new Error('Please correct any errors before generating a link.');
			}

			const payload = buildRequestPayload();

			/** Needs to be fixed due Tanstack Query and useFormSubmission conflict - Loading states, Error handling, etc. don't work as expected*/

			// createLink(
			// 	{ documentId, payload },
			// 	{
			// 		onSuccess: (data) => {
			// 			if (!data?.link?.linkUrl) {
			// 				throw new Error('No link returned by server.');
			// 			}

			// 			onClose('Form submitted', data.link.linkUrl);

			// 			if (values.selectFromContact || values.sendToOthers) {
			// 				handleSendInvites(data.link.linkUrl);
			// 			}

			// 			toast.showToast({
			// 				message: 'New link created successfully!',
			// 				variant: 'success',
			// 			});
			// 		},
			// 		onError: (error) => {
			// 			console.error('Create link error:', error);
			// 			const message =
			// 				(error as any)?.response?.data?.message || 'Failed to create link. Please try again.';
			// 			toast.showToast({
			// 				message,
			// 				variant: 'error',
			// 			});
			// 		},
			// 	},
			// );

			/**
			 * TODO: This is a temporary solution to handle the loading state and error handling.
			 * Working on a better solution to handle the loading state and error handling.
			 */
			const { link } = await createLink({ documentId, payload });
			onClose('submitted', link.linkUrl);

			if (values.selectFromContact || values.sendToOthers) {
				await handleSendInvites(link.linkUrl);
			}
		},
		successMessage: 'Link created successfully!',
	});

	function handleCancel() {
		onClose('cancelled');
	}
	const isLoading = formLoading || isPending;

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			component='form'
			onSubmit={handleSubmit}
			fullWidth
			maxWidth='sm'>
			<DialogTitle variant='h2'>
				Create new link
				<Typography
					my={4}
					component='div'
					variant='body2'>
					Selected document:{' '}
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
				<Box
					display='flex'
					flexDirection='column'
					gap={2}>
					<LinkDetailsAccordion
						formValues={values}
						handleInputChange={handleInputChange}
					/>

					<CustomAccordion
						title='Sharing options'
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
							handleVisitorFieldChange={handleVisitorFieldChange}
						/>
					</CustomAccordion>

					<CustomAccordion
						title='Sending'
						expanded={expanded === 'sending'}
						onChange={handleChange('sending')}>
						<SendingAccordion
							formValues={values}
							handleInputChange={handleInputChange}
							handleBlur={handleBlur}
							getError={getError}
						/>
					</CustomAccordion>
				</Box>
			</DialogContent>

			<DialogActions sx={{ p: 16 }}>
				<LoadingButton
					loading={isLoading}
					buttonText='Generate'
					loadingText='Generating...'
					fullWidth
					type='submit'
				/>
			</DialogActions>
		</Dialog>
	);
}
