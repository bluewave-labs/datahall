import { Alert, Box, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import NavLink from '../navigation/NavLink';
import { ToastVariant } from '@/providers/toast/toastTypes';
import { XCloseIcon } from '@/icons';

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

const SlideTransition = forwardRef(function SlideTransition(props: SlideProps, ref) {
	return (
		<Slide
			ref={ref}
			{...props}
			direction='left'
		/>
	);
});

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
				slots={{ transition: SlideTransition }}
				slotProps={{
					transition: {
						appear: true,
						style: {
							transitionDelay: `${index * 300}ms`,
						},
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
