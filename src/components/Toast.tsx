import { Alert, Box, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import { ReactNode } from 'react';
import NavLink from './NavLink';
import { ToastVariant } from '@/providers/toast/toastTypes';
import { XCloseIcon } from '@/../public/assets/icons';

interface BaseToastProps {
	variant?: ToastVariant;
	autoHide?: boolean;
	index?: number;
}

type ToastWithMessage = BaseToastProps & {
	message: string;
	toastLink?: string;
	toastLinkText?: string;
	children?: never;
};

type ToastWithChildren = BaseToastProps & {
	children: ReactNode;
	message?: never;
	toastLink?: never;
	toastLinkText?: never;
};

type ToastProps = ToastWithMessage | ToastWithChildren;

const SlideTransition = (props: SlideProps) => {
	return (
		<Slide
			{...props}
			direction='left'
		/>
	);
};

export default function Toast({
	variant = 'info',
	message,
	toastLink,
	toastLinkText = 'Learn more',
	autoHide = true,
	open,
	hideToast,
	children,
	index = 0,
}: ToastProps & { open: boolean; hideToast: () => void }) {
	const action = (
		<IconButton onClick={hideToast}>
			<XCloseIcon />
		</IconButton>
	);

	return (
		<Box>
			<Snackbar
				open={open}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				autoHideDuration={autoHide ? 4000 : null}
				onClose={hideToast}
				TransitionComponent={SlideTransition}
				TransitionProps={{
					style: {
						transitionDelay: `${index * 300}ms`,
					},
				}}
				action={action}
				sx={{ mt: index * 30 }}>
				<Alert
					onClose={hideToast}
					icon={false}
					variant='standard'
					severity={variant}>
					{message ? (
						<Box
							component='span'
							display='inline-flex'
							alignItems='center'
							gap={5}>
							{message}{' '}
							{toastLink && (
								<NavLink
									href={toastLink}
									linkText={toastLinkText}
								/>
							)}
						</Box>
					) : (
						children
					)}
				</Alert>
			</Snackbar>
		</Box>
	);
}
