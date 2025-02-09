import React from 'react';

import { Box, IconButton, MenuItem, RadioGroup, Select, Typography } from '@mui/material';

import { EyeIcon, EyeOffIcon } from '@/../public/assets/icons';

import CustomCheckbox from '@/components/CustomCheckbox';
import FormInput from '@/components/FormInput';
import { LinkFormValues } from '@/utils/shared/models';

interface SharingOptionsAccordionProps {
	formValues: any;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isPasswordVisible: boolean;
	setIsPasswordVisible: (visible: boolean) => void;
	expirationType: string;
	getError: (fieldName: keyof LinkFormValues) => string;
	handleExpirationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const SharingOptionsAccordion = ({
	getError,
	formValues,
	handleInputChange,
	isPasswordVisible,
	setIsPasswordVisible,
	expirationType,
	handleBlur,
	handleExpirationChange,
}: SharingOptionsAccordionProps) => {
	return (
		<Box py={2}>
			<CustomCheckbox
				checked={formValues.requireUserDetails}
				onChange={handleInputChange}
				name='requireUserDetails'
				label='Ask for the following to view and download the document'
			/>

			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				mt={2}
				mb={4}
				ml={13}>
				<Select
					size='small'
					name='requiredUserDetailsOption'
					sx={{ minWidth: 250 }}
					disabled={!formValues.requireUserDetails}
					value={formValues.requiredUserDetailsOption}
					onChange={(event) => {
						handleInputChange({
							target: {
								name: 'requiredUserDetailsOption',
								value: event.target.value,
							},
						} as any);
					}}>
					<MenuItem value={1}>Name</MenuItem>
					<MenuItem value={2}>Name and email</MenuItem>
				</Select>
			</Box>

			<CustomCheckbox
				checked={formValues.requirePassword}
				onChange={handleInputChange}
				name='requirePassword'
				label='Require a password to view and download the document'
			/>

			<Box
				display='flex'
				alignItems='center'
				justifyContent='flex-start'
				mt={2}
				mb={4}
				ml={13}>
				<FormInput
					id='password'
					minWidth={420}
					value={formValues.password}
					onChange={(e) =>
						handleInputChange({
							target: {
								name: 'password',
								value: e.target.value,
							},
						} as any)
					}
					sx={{ my: 4 }}
					placeholder='Enter password'
					type={isPasswordVisible ? 'text' : 'password'}
					disabled={!formValues.requirePassword}
					errorMessage={getError('password')}
					onBlur={handleBlur}
				/>
				<IconButton
					size='large'
					sx={{ ml: 4 }}
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
					{isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
				</IconButton>
			</Box>

			<CustomCheckbox
				checked={formValues.expirationEnabled}
				onChange={handleInputChange}
				name='expirationEnabled'
				label='Expiration'
			/>
			<Typography
				variant='body2'
				mb={3}>
				Link won't be visible after a certain day or a certain date.
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
					ml={7.5}>
					{/* <Radio value="date" /> */}
					<Typography
						variant='body1'
						mr={4}>
						Expiration time
					</Typography>
					<FormInput
						id='expirationTime'
						value={formValues.expirationTime}
						onChange={(e) =>
							handleInputChange({
								target: {
									name: 'expirationTime',
									value: e.target.value,
								},
							} as any)
						}
						placeholder=''
						type='date'
						minWidth={200}
						disabled={!formValues.expirationEnabled}
					/>
				</Box>
			</RadioGroup>
		</Box>
	);
};

export default SharingOptionsAccordion;
