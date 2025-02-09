import SignIn from '@/app/auth/sign-in/page';
import Sidebar from '@/app/layout/Sidebar';
import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function AuthWrapper({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const pathname = usePathname(); // Get the current route path

	// Define the public routes
	const publicRoutes = [
		'/auth/sign-up',
		'/auth/forgot-password',
		'/auth/reset-password',
		'/auth/account-created',
		'/auth/password-reset-confirm',
		'/auth/check-email',
	];

	// Check if the current path starts with /auth/reset-password, which is dynamic
	const isResetPassFormRoute =
		pathname.startsWith('/auth/reset-password') && pathname.includes('reset-password');

	const isLinksUuidRoute =
		pathname.startsWith('/links/') && /^[a-f0-9-]{36}$/.test(pathname.split('/links/')[1]);
	// Local state to handle loading state
	const [isLoading, setIsLoading] = useState(true);

	// useEffect to handle session status changes
	useEffect(() => {
		if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status]);

	// Show a loading state while fetching the session
	if (isLoading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='100vh'>
				<CircularProgress size={80} />
			</Box>
		);
	}

	if (isLinksUuidRoute) {
		return <>{children}</>;
	}

	// If the user is trying to access a restricted route and is not signed in, redirect to the sign-in page
	if (!session && !publicRoutes.includes(pathname) && !isResetPassFormRoute) {
		// Redirect the user to the sign-in page with a callback URL
		return <SignIn />;
	}

	// Render authenticated layout only when session is authenticated
	if (publicRoutes.includes(pathname) || isResetPassFormRoute) {
		return <>{children}</>;
	}

	return (
		<>
			<Box
				display='flex'
				bgcolor='background.content'
				height='100vh'
				width='100vw'>
				<Sidebar />
				<Box
					width='100%'
					py={{ sx: 4, sm: 10, md: 20 }}
					px={{ sx: 4, sm: 8, md: 30 }}>
					{children}
				</Box>
			</Box>
		</>
	);
}
