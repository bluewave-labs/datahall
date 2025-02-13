import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactElement, useState } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';

import { ChevronUpIcon, LogOutIcon, UserIcon, UsersIcon } from '@/../public/assets/icons';

export default function DropdownMenu() {
	const router = useRouter();
	const { data: session } = useSession();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const firstName = session?.user?.firstName || '';
	const lastName = session?.user?.lastName || '';
	const fullName = `${firstName} ${lastName}`.trim() || 'No Name';

	const menuItems = [
		{ text: 'Profile', icon: UserIcon, href: '/profile' },
		// { text: 'Team', icon: UsersIcon, href: '/team' },
	];

	return (
		<Box
			display='flex'
			mx='auto'
			alignItems='center'>
			<Button
				onClick={handleClick}
				size='small'
				sx={{
					typography: 'h2',
					textTransform: 'capitalize',
				}}
				startIcon={
					<Avatar
						src={'' /* Add avatarUrl */}
						sx={{
							bgcolor: '#F2F4F7',
							color: 'text.brand',
							width: { sm: '2.1rem', md: '2.3rem', lg: '2.5rem' },
							height: { sm: '2.1rem', md: '2.3rem', lg: '2.5rem' },
							mr: { sm: '0.2rem', md: '0.4rem', lg: '0.6rem' },
						}}>
						{`${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()}
					</Avatar>
				}
				endIcon={
					<Box
						component={ChevronUpIcon}
						sx={{
							mt: 1,
							width: { sm: '1rem', md: '1.1rem', lg: '1.25rem' },
							height: 'auto',
							transform: open ? 'rotate(-180deg) translateY(-2px)' : 'rotate(0deg) translateY(0)',
							transition: 'transform 0.4s ease-in-out',
						}}
					/>
				}>
				{fullName}
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				sx={{
					mt: -10,
					mr: 2,
					'& .MuiMenuItem-root': {
						py: 7,
						px: 10,
					},
				}}>
				{menuItems.map(({ text, icon, href }) => (
					<Link
						key={text}
						href={href}
						style={{ textDecoration: 'none', color: 'inherit' }}>
						<MenuItem
							onClick={handleClose}
							sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<Box
								component={icon}
								width={{ sm: '0.8rem', md: '0.9rem', lg: '1.25rem' }}
								height='auto'
								strokeWidth={2.2}
							/>
							<Typography variant='body1'>{text}</Typography>
						</MenuItem>
					</Link>
				))}

				<MenuItem
					onClick={() => {
						handleClose();
						signOut();
						router.push('/');
					}}
					sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<Box
						component={LogOutIcon}
						width={{ sm: '0.8rem', md: '0.9rem', lg: '1.1rem' }}
						height='auto'
					/>
					<Typography variant='body1'>Log out</Typography>
				</MenuItem>
			</Menu>
		</Box>
	);
}
