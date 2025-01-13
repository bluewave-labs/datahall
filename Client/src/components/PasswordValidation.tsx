import { getPasswordChecks } from '@/utils/shared/validators';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface PasswordValidationProps {
	passwordValue: string;
	isBlur?: boolean;
}

const PasswordValidation: FC<PasswordValidationProps> = ({ passwordValue, isBlur }) => {
	const { isLengthValid, hasUppercaseLetter, hasSymbol } = getPasswordChecks(passwordValue);

	return (
		<Box
			display='flex'
			flexDirection='column'
			gap={6}
			mb={3}>
			{/* Has at least 8 characters */}
			<Box
				display='flex'
				alignItems='center'
				gap={5}>
				{passwordValue && !isLengthValid && isBlur ? (
					<CloseIcon color='error' />
				) : (
					<CheckIcon color={isLengthValid ? 'success' : 'disabled'} />
				)}
				<Typography variant='body2'>Must be at least 8 characters</Typography>
			</Box>

			{/* Has at least one uppercase letter */}
			<Box
				display='flex'
				alignItems='center'
				gap={5}>
				{passwordValue && !hasUppercaseLetter && isBlur ? (
					<CloseIcon color='error' />
				) : (
					<CheckIcon color={hasUppercaseLetter ? 'success' : 'disabled'} />
				)}
				<Typography variant='body2'>Must contain at least one uppercase letter.</Typography>
			</Box>

			{/* Has at least one symbol */}
			<Box
				display='flex'
				alignItems='center'
				gap={5}>
				{passwordValue && !hasSymbol && isBlur ? (
					<CloseIcon color='error' />
				) : (
					<CheckIcon color={hasSymbol ? 'success' : 'disabled'} />
				)}
				<Typography variant='body2'>Must Include at least one symbol.</Typography>
			</Box>
		</Box>
	);
};

export default PasswordValidation;