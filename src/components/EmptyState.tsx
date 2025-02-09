import { Container, Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { EmptyStateIcon } from '@/../public/assets/icons';

interface EmptyStateProps {
	message: string;
	icon?: ReactNode;
	buttonText?: string;
	buttonAction?: () => void;
	children?: ReactNode;
}

/**
 * A reusable empty state component for empty items, such as tables, that are completely out of data.
 * For example, in the parent component, we can handle the following code:
 * {!data.length && <EmptyState message="No contacts found." icon={<EmptyStateIcon />} />}
 *
 * @param {string} [message] - The message of empty states. Required.
 * @param {ReactNode} [icon= <EmptyStateIcon />] - The icon of empty states. Optional.
 * @param {string} [buttonText] - The button text of empty states. Optional.
 * @param {() => void} [buttonAction] - The button action of empty states. Optional.
 * @param {ReactNode} [children] - Custom JSX elements for more complex empty states (e.g., multiple buttons or additional text). Optional.
 *
 * @returns {JSX.Element} A scalable and responsive design including a message, icon, button, or passed children.
 */

export default function EmptyState({
	message,
	icon = <EmptyStateIcon />,
	buttonText,
	buttonAction,
	children,
}: EmptyStateProps) {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				py: { sm: 10, md: 13, lg: 20 },
			}}>
			{icon && (
				<Box
					boxSizing='border-box'
					mb={{ sm: 2, md: 4, lg: 6 }}>
					{icon}
				</Box>
			)}
			<Box>
				<Typography variant='body1'>{message}</Typography>
			</Box>
			{buttonText && buttonAction ? (
				<Box mt={{ sm: 15, md: 20, lg: 30 }}>
					<Button
						variant='contained'
						onClick={buttonAction}>
						{buttonText}
					</Button>
				</Box>
			) : (
				children && <Box mt={{ sm: 10, md: 15, lg: 25 }}>{children}</Box>
			)}
		</Container>
	);
}
