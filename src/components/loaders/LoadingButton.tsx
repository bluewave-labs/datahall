// components/LoadingButton.tsx
import { Button, CircularProgress, ButtonProps } from '@mui/material';
import { FormEvent } from 'react';

interface LoadingButtonProps extends ButtonProps {
	loading: boolean;
	buttonText: string;
	loadingText?: string;
	fullWidth?: boolean;
	onClick?: (event: FormEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'primary' | 'secondary' | 'error';
}

const LoadingButton = ({
	loading,
	buttonText,
	loadingText = 'Loading...',
	fullWidth = true,
	onClick,
	type = 'submit',
	variant = 'contained',
	color = 'primary',
	...props
}: LoadingButtonProps) => {
	return (
		<Button
			type={type}
			fullWidth={fullWidth}
			variant={variant}
			color={color}
			disabled={loading}
			onClick={onClick}
			endIcon={
				loading ? (
					<CircularProgress
						size={20}
						color='inherit'
					/>
				) : null
			}
			{...props}>
			{loading ? loadingText : buttonText}
		</Button>
	);
};

export default LoadingButton;
