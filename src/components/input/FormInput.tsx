/**
 * FormInput.tsx
 * ----------------------------------------------------------------------------
 * A unified reusable input component built on top of MUI's TextField.
 *
 * NOTES:
 * - Supports all standard TextFieldProps (type, disabled, etc.).
 * - "label" is rendered above the TextField as a separate Typography element.
 * - "errorMessage" will display inline below the TextField if provided.
 * - "minWidth" is applied via sx props for basic styling.
 */

import React, { FC } from 'react';
import { Box, TextField, Typography, TextFieldProps } from '@mui/material';

interface FormInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
	/** Optional label rendered above the TextField. */
	label?: string;

	/** The unique identifier for this field (used for id/name). */
	id: string;

	/** An inline error message displayed below the TextField if validation fails. */
	errorMessage?: string;

	/** An optional custom minimum width for the TextField, in pixels. */
	minWidth?: number;

	/** An optional custom minimum height for the TextField helpertext */
	minHeight?: number;
}

const FormInput: FC<FormInputProps> = ({
	label,
	id,
	errorMessage = '',
	minWidth,
	minHeight = '1.5em',
	fullWidth = true,
	size = 'small',
	// Any other TextField props
	...props
}) => {
	const displayError = Boolean(errorMessage);

	return (
		<Box>
			{/* Render a top label if provided */}
			{label && (
				<Typography
					variant='h3'
					mb={4}>
					{label}
				</Typography>
			)}

			<TextField
				{...props}
				id={id}
				name={id}
				size={size}
				fullWidth={fullWidth}
				error={displayError}
				{...(displayError && { helperText: errorMessage })}
				slotProps={{
					formHelperText: {
						sx: {
							minHeight: displayError ? minHeight : '0em',
						},
					},
				}}
				sx={{
					minWidth,
					...props.sx,
				}}
			/>
		</Box>
	);
};

export default FormInput;
