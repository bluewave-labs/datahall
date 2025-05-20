// ──────────────────────────────────────────────────────────────────────────────
// PasswordValidation.tsx
// ----------------------------------------------------------------------------
// Live “strength” feedback shown below a password field.
// Relies on getPasswordChecks() so the regexes remain DRY.
// ----------------------------------------------------------------------------

import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { CheckCircleIcon, XCircleIcon } from '@/icons';
import { getPasswordChecks } from '@/shared/validation/validationUtils';

interface PasswordValidationProps {
	/** Current password text from the parent form */
	passwordValue: string;
	/** Show red cross icons only after the field has lost focus */
	isBlur?: boolean;
}

const PasswordValidation: FC<PasswordValidationProps> = ({ passwordValue, isBlur = false }) => {
	const { isLengthValid, hasUppercase, hasSymbol } = getPasswordChecks(passwordValue);

	/**
	 * Returns the appropriate icon for each rule.
	 * – While the user is typing (not blurred yet), we show grey “disabled”
	 *   circles to avoid scaring them.
	 * – After blur, failing rules show a red X.
	 */
	const renderIcon = (rulePassed: boolean) =>
		passwordValue && !rulePassed && isBlur ? (
			<XCircleIcon color='error' />
		) : (
			<CheckCircleIcon color={rulePassed ? 'success' : 'disabled'} />
		);

	return (
		<Box
			display='flex'
			flexDirection='column'
			gap={6}
			mb={3}>
			{/* ≥ 8 chars ----------------------------------------------------------- */}
			<Box
				display='flex'
				alignItems='center'
				gap={5}>
				{renderIcon(isLengthValid)}
				<Typography variant='body2'>Must be at least 8 characters</Typography>
			</Box>

			{/* uppercase ---------------------------------------------------------- */}
			<Box
				display='flex'
				alignItems='center'
				gap={5}>
				{renderIcon(hasUppercase)}
				<Typography variant='body2'>Must contain at least one uppercase letter</Typography>
			</Box>

			{/* symbol ------------------------------------------------------------- */}
			<Box
				display='flex'
				alignItems='center'
				gap={5}>
				{renderIcon(hasSymbol)}
				<Typography variant='body2'>Must include at least one symbol</Typography>
			</Box>
		</Box>
	);
};

export default PasswordValidation;
