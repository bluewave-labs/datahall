import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

import { CheckSquareIcon, SquareIcon } from '../../public/assets/icons';

import { ChangeEvent } from 'react';

interface CustomCheckboxProps extends CheckboxProps {
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	name: string;
}

const CustomCheckbox = ({ checked, onChange, label, name, ...props }: CustomCheckboxProps) => (
	<FormControlLabel
		control={
			<Checkbox
				icon={<SquareIcon />}
				checkedIcon={<CheckSquareIcon />}
				checked={checked}
				name={name}
				onChange={onChange}
				{...props}
			/>
		}
		label={label}
	/>
);

export default CustomCheckbox;
