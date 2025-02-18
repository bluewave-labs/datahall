'use client';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import LoadingSpinner from '@/components/LoadingSpinner';
import AuthWrapper from '@/providers/auth/AuthWrapper';
import { ToastProvider } from '@/providers/toast/ToastProvider';

import globalTheme from '@/theme/globalTheme';

export default function Providers({ children }: { children: React.ReactNode }) {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		// Show a loading spinner while the client-side is hydrating
		return <LoadingSpinner />;
	}

	return (
		<SessionProvider>
			<AppRouterCacheProvider>
				<ThemeProvider theme={globalTheme}>
					<CssBaseline />
					<ToastProvider>
						<AuthWrapper>{children}</AuthWrapper>
					</ToastProvider>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</SessionProvider>
	);
}
