'use client';

import { Box, Breadcrumbs, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import NavLink from './NavLink';

import {
	ChevronRightIcon,
	FileIcon,
	HomeIcon,
	SettingsIcon,
	UserIcon,
	UsersIcon,
} from '@/../public/assets/icons';

const Breadcrumb = () => {
	const pathname = usePathname();

	const iconMap: { [key: string]: React.ReactNode } = {
		documents: (
			<FileIcon
				width={20}
				height={20}
			/>
		),
		contacts: (
			<UserIcon
				width={20}
				height={20}
			/>
		),
		settings: (
			<SettingsIcon
				width={20}
				height={20}
			/>
		),
		profile: (
			<UserIcon
				width={20}
				height={20}
				strokeWidth={2.2}
			/>
		),
		team: (
			<UsersIcon
				width={20}
				height={20}
			/>
		),
	};

	const pathnames = pathname.split('/').filter((x) => x);

	// Helper function to render icon + text
	const renderBreadcrumb = (label: string, href: string, isLast: boolean) => {
		const icon = iconMap[label.toLowerCase()];
		return (
			<Box
				key={href}
				display='flex'
				alignItems='center'>
				{icon}
				{isLast ? (
					<Typography
						variant='subtitle1'
						ml={3}>
						{label.charAt(0).toUpperCase() + label.slice(1)}
					</Typography>
				) : (
					<NavLink
						href={href}
						color='text.primary'
						variant='body1'
						sx={{ ml: 3 }}
						linkText={label.charAt(0).toUpperCase() + label.slice(1)}
					/>
				)}
			</Box>
		);
	};

	const breadcrumbs = useMemo(() => {
		return pathnames.map((value, index) => {
			const isLast = index === pathnames.length - 1;
			const href = `/${pathnames.slice(0, index + 1).join('/')}`;
			return renderBreadcrumb(value, href, isLast);
		});
	}, [pathnames]);

	return (
		<Breadcrumbs
			aria-label='breadcrumb'
			separator={
				<ChevronRightIcon
					width={19}
					height={19}
				/>
			}
			sx={{ mb: '1rem' }}>
			<Box
				display='flex'
				alignItems='center'>
				<HomeIcon
					width={20}
					height={20}
				/>
				<NavLink
					href='/'
					color='text.primary'
					variant='body1'
					ml={3}
					linkText='Home'
				/>
			</Box>
			{breadcrumbs}
		</Breadcrumbs>
	);
};

export default Breadcrumb;
