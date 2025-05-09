import React from 'react';
import { Box, IconButton, Typography, RadioGroup, Select, Chip, MenuItem } from '@mui/material';

import { EyeIcon, EyeOffIcon } from '@/icons';

import { CustomCheckbox, FormInput } from '@/components';
import { LinkFormValues } from '@/shared/models';
import { sortFields } from '@/shared/utils';
import { visitorFieldsConfig } from '@/shared/config/visitorFieldsConfig';

interface SharingOptionsAccordionProps {
	formValues: LinkFormValues;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isPasswordVisible: boolean;
	setIsPasswordVisible: (visible: boolean) => void;
	expirationType: string;
	getError: (fieldName: keyof LinkFormValues) => string;
	handleExpirationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	handleVisitorFieldChange: (fields: string[]) => void;
}

export default function SharingOptionsAccordion(props: SharingOptionsAccordionProps) {
	const {
		formValues,
		handleInputChange,
		isPasswordVisible,
		setIsPasswordVisible,
		expirationType,
		getError,
		handleExpirationChange,
		handleBlur,
		handleVisitorFieldChange,
	} = props;

	const disabled = formValues.isPublic;
	// If link is public => disable all these additional security checkboxes

	return (
		<Box
			py={2}
			display={'flex'}
			flexDirection={'column'}>
			<CustomCheckbox
				checked={formValues.requireUserDetails}
				onChange={handleInputChange}
				name='requireUserDetails'
				label='Ask for the following to view and download the document'
				disabled={disabled}
			/>

			<Box
				display='flex'
				flexDirection='column'>
				<Typography variant='body2'>Select required visitor details:</Typography>
				<Box
					ml={14}
					mt={5}
					mb={8}>
					<Select
						multiple
						size='small'
						id='visitorFields'
						value={formValues.visitorFields}
						disabled={!formValues.requireUserDetails}
						onChange={(e) => handleVisitorFieldChange(e.target.value as string[])}
						sx={{ minWidth: 455 }}
						renderValue={(selected) => {
							const sortedSelected = sortFields(selected, visitorFieldsConfig);
							return (
								<Box
									display='flex'
									gap={2}>
									{sortedSelected.map((key) => {
										const field = visitorFieldsConfig.find((f) => f.key === key);
										return (
											<Chip
												key={key}
												label={field?.label || key}
												sx={{ px: '0.8rem' }}
												size='small'
											/>
										);
									})}
								</Box>
							);
						}}>
						{visitorFieldsConfig.map((visitorField) => (
							<MenuItem
								key={visitorField.key}
								value={visitorField.key}>
								{visitorField.label}
							</MenuItem>
						))}
					</Select>
				</Box>
			</Box>

			<CustomCheckbox
				checked={formValues.requirePassword}
				onChange={handleInputChange}
				name='requirePassword'
				label='Require a password to view and download the document'
				disabled={disabled}
			/>

			<Box
				display='flex'
				alignItems='center'
				justifyContent='flex-start'
				mb={4}
				ml={14}>
				<FormInput
					id='password'
					minWidth={455}
					value={formValues.password}
					onChange={handleInputChange}
					sx={{ my: 4 }}
					placeholder='Enter password'
					type={isPasswordVisible ? 'text' : 'password'}
					disabled={!formValues.requirePassword}
					errorMessage={formValues.password ? getError('password') : undefined}
					onBlur={handleBlur}
				/>
				<IconButton
					size='large'
					sx={{ ml: 4 }}
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
					{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
				</IconButton>
			</Box>

			{/* Expiration */}
			<CustomCheckbox
				checked={formValues.expirationEnabled}
				onChange={handleInputChange}
				name='expirationEnabled'
				label='Expiration'
				disabled={disabled}
			/>
			<Typography
				variant='body2'
				mb={3}>
				Link won&apos;t be visible after a certain day or a certain date.
			</Typography>

			<RadioGroup
				aria-label='expiration'
				name='expirationType'
				value={expirationType}
				onChange={handleExpirationChange}
				sx={{ display: 'flex', gap: 12, ml: 7.5 }}>
				{/* <Box display="flex" alignItems="center" gap={2}>
				<Radio value="days" />
				<CustomTextField
					value={formValues.expirationDays}
					onChange={(e) =>
						handleInputChange({
							target: {
								name: 'expirationDays',
								value: e.target.value,
							},
						} as any)
					}
					placeholder=""
					type="number"
					minWidth={200}
					disabled={!formValues.expirationEnabled}
				/>
				<Typography variant="body1" ml={1}>
					days
				</Typography>
			</Box> */}

				<Box
					display='flex'
					alignItems='center'
					gap={2}
					ml={7.5}
					mb={10}>
					{/* <Radio value="date" /> */}
					<Typography
						variant='body1'
						mr={4}>
						Expiration time
					</Typography>
					<FormInput
						id='expirationTime'
						value={formValues.expirationTime}
						onChange={handleInputChange}
						placeholder=''
						type='datetime-local'
						minWidth={200}
						disabled={!formValues.expirationEnabled}
					/>
				</Box>
			</RadioGroup>
		</Box>
	);
}
