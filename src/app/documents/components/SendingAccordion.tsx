import React from 'react';

import { Box } from '@mui/material';

import Dropdown from '@/components/Dropdown';
import CustomCheckbox from '@/components/CustomCheckbox';
import FormInput from '@/components/FormInput';

interface SendingAccordionProps {
	formValues: any;
	handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SendingAccordion({
	formValues,
	handleCheckboxChange,
}: SendingAccordionProps) {
	return (
		<Box py={4}>
			<CustomCheckbox
				checked={formValues.selectFromContact}
				onChange={handleCheckboxChange}
				name='selectFromContact'
				label='Select from the contact list'
			/>
			<Box
				mt={2}
				mb={4}
				ml={13}>
				<Dropdown
					options={[
						{ value: 'search', label: 'Search' },
						{ value: 'contact1', label: 'John Doe' },
						{ value: 'contact2', label: 'Jane Doe' },
					]}
					initialValue='search'
					variant='outlined'
					minWidth={300}
					px={7}
					py={4}
				/>
			</Box>

			<CustomCheckbox
				checked={formValues.sendToOthers}
				onChange={handleCheckboxChange}
				name='sendToOthers'
				label='Send someone not in the contact list. Separate with commas.'
			/>
			<Box
				mt={2}
				mb={4}
				ml={13}>
				<FormInput
					id='otherEmails'
					value={formValues.otherEmails}
					onChange={(e) =>
						handleCheckboxChange({
							target: {
								name: 'otherEmails',
								value: e.target.value,
							},
						} as any)
					}
					placeholder='Enter emails, separated by commas'
					type='email'
					minWidth={430}
				/>
			</Box>
		</Box>
	);
}
