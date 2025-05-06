import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Providers from './providers';
import EnvironmentBadge from '@/components/common/EnvironmentBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Blw-Datahall',
	description: 'Share documents safely with your team and customers',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					{children}
					<EnvironmentBadge />
				</Providers>
			</body>
		</html>
	);
}
