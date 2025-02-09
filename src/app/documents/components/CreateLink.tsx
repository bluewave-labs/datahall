import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';

import {
	Box,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@mui/material';

import CustomAccordion from './CustomAccordion';
import LinkDetailsAccordion from './LinkDetailsAccordion';
import SharingOptionsAccordion from './SharingOptionsAccordion';
import SendingAccordion from './SendingAccordion';
import LoadingButton from '@/components/LoadingButton';

import { useDocumentDetail, useFormSubmission, useValidatedFormData } from '@/hooks';

import { LinkFormValues } from '@/utils/shared/models';
import { computeExpirationDays } from '@/utils/shared/utils';
import { minLengthRule } from '@/utils/shared/validators';

import { CheckIcon, CopyIcon, LinkIcon } from '@/../public/assets/icons';

interface CreateLinkProps {
	onClose: (action: string) => void;
	open: boolean;
	documentId: string;
}

export default function CreateLink({ onClose, open, documentId }: CreateLinkProps) {
	const [expanded, setExpanded] = useState<string | false>('');
	const [isLinkCopied, setIsLinkCopied] = useState(false);
	const [shareableLink, setShareableLink] = useState('');
	const [expirationType, setExpirationType] = useState('days');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const validationRules = {
		password: [minLengthRule(5, 'Password must be at least 5 characters long.')],
	};

	const initialFormValues: LinkFormValues = {
		isPublic: true,
		otherEmails: '',
		expirationTime: '',
		requirePassword: false,
		expirationEnabled: false,
		requireUserDetails: false,
		requiredUserDetailsOption: 1,
	};

	const { values, setValues, validateAll, getError, handleBlur } = useValidatedFormData<LinkFormValues>({
		initialValues: initialFormValues,
		validationRules
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
					// If user empties the field
					setValues((prev) => ({ ...prev, expirationDays: '' }));
				}
			}
			// If user sets expirationDate
			else if (name === 'expirationDate') {
				const date = new Date(value);
				setValues((prev) => ({
					...prev,
					expirationTime: date.toISOString(),
					expirationDate: value,
				}));
			}
			// Otherwise, default handleChange from useValidatedFormData
			else {
				// If it's a checkbox, we do the checked logic. If not, normal string value.
				setValues((prev) => ({
					...prev,
					[name]: type === 'checkbox' ? checked : value,
				}));
			}
		},
		[setValues],
	);

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};
	/**
	 * useEffect to recalc expirationDays if expirationTime changes outside of direct user input
	 */
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

	/**
	 * Build final payload for POST request
	 */
	const buildRequestPayload = (): Record<string, any> => {
		const payload: Record<string, any> = {
			documentId,
			isPublic: values.isPublic,
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
		payload.friendlyName = values.friendlyName;
		return payload;
	};

	const { loading, handleSubmit, error, toast } = useFormSubmission({
		onSubmit: async () => {
			const hasError = validateAll();

			if (hasError) {
				throw new Error('Please correct any errors before generating a link.');
			}

			const payload = buildRequestPayload();
			const response = await axios.post('/api/links', payload);
			if (!response.data?.link?.linkUrl) {
				throw new Error('No link returned by server.');
			}
			setShareableLink(response.data.link.linkUrl);
			setValues(initialFormValues);
			setExpanded(false);
		},
		onSuccess: () => {
			toast.showToast({
				message: 'Shareable link created successfully!',
				variant: 'success',
			});
			onClose('Form submitted');
		},
		onError: (errMsg) => {
			console.error('Create link error:', errMsg);
		},
		errorMessage: 'Failed to create shareable link. Please try again later.',
	});

	const handleLinkCopy = (linkToCopy: string) => {
		if (linkToCopy) {
			navigator.clipboard.writeText(linkToCopy);
			setIsLinkCopied(true);
			setTimeout(() => {
				setIsLinkCopied(false);
			}, 3000);
		}
	};

	const handleFormCleanup = () => {
		setValues(initialFormValues);
		setExpanded(false);
		onClose('cancelled');
	}

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleFormCleanup}
				component={'form'}
				onSubmit={handleSubmit}
				fullWidth
				maxWidth='sm'>
				<DialogTitle variant='h2'>
					Create shareable link
					<Typography
						my={4}
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
				<DialogContent sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
					<Box
						width={580}
						height={expanded ? 520 : 180}
						sx={{ transition: 'height 0.6s' }}>
						{/* <CustomAccordion
						title='Link Details'
						defaultExpanded></CustomAccordion> */}
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

						{/* <CustomAccordion
						title='Sending'
						expanded={expanded === 'sending-options'}
						onChange={handleChange('sending-options')}>
						<SendingAccordion
							formValues={values}
							handleCheckboxChange={handleInputChange}
						/>
					</CustomAccordion> */}
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

			{shareableLink && (
				<Dialog
					open={!!shareableLink}
					onClose={() => {
						setShareableLink(''), onClose('cancelled');
					}}
					fullWidth
					maxWidth='sm'>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						width='100%'>
						<DialogTitle variant='h2'>Shareable link </DialogTitle>
					</Box>
					<DialogContent
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 5,
							width: '100%',
						}}>
						<Chip
							color='secondary'
							icon={<LinkIcon />}
							label={shareableLink}
							sx={{
								typography: 'h4',
								flexGrow: 1,
								justifyContent: 'left',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}
						/>

						<IconButton
							onClick={() => handleLinkCopy(shareableLink)}
							sx={{
								transition: '0.2s',
							}}>
							{isLinkCopied ? (
								<CheckIcon
									width={15}
									height={15}
								/>
							) : (
								<CopyIcon />
							)}
						</IconButton>
					</DialogContent>
				</Dialog>
			)}

		</React.Fragment>
	);
}
