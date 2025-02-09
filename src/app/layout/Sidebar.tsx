'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import BlueWaveLogo from '../../../public/assets/BluewaveLogo';

import { FileIcon, MenuIcon, SettingsIcon, UserIcon } from '@/../public/assets/icons';

import DropdownMenu from './DropdownMenu';
import { useState } from 'react';

import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Toolbar,
	useMediaQuery,
	useTheme,
	AppBar,
	IconButton,
} from '@mui/material';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const menuItems = [
		{ text: 'Documents', icon: FileIcon, href: '/documents' },
		{ text: 'Contacts', icon: UserIcon, href: '/contacts' },
		// { text: 'Settings', icon: SettingsIcon, href: '/settings' },
	];

	const openSidebar = () => setIsOpen(true);
	const closeSidebar = () => setIsOpen(false);

	return (
		<Box display='flex'>
			{isMobile && (
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							onClick={openSidebar}
							edge='start'>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			)}
			<Drawer
				variant={isMobile ? 'temporary' : 'permanent'}
				open={isOpen}
				onClose={closeSidebar}
				ModalProps={{
					keepMounted: true, // Better open performance
				}}
				sx={{
					width: { sm: '11rem', md: '16rem', lg: '18rem' },
					'& .MuiDrawer-paper': {
						width: { sm: '11rem', md: '16rem', lg: '18rem' },
						boxSizing: 'border-box',
					},
				}}>
				<Stack
					justifyContent='space-between'
					sx={{
						height: '100vh',
						backgroundColor: 'background.fill',
						pt: { xs: 4, sm: 8, md: 16 },
						pb: { xs: 2, sm: 4, md: 10 },
						px: { xs: 2, sm: 4, md: 10 },
						borderRight: 1,
						borderColor: 'border.light',
					}}>
					{/* Top Section */}
					<Box
						display='flex'
						flexDirection='column'
						gap={4}>
						<Box
							component={BlueWaveLogo}
							mx='auto'
							my={{ xs: 0, sm: 1, md: 8 }}
							width={{ sm: '9rem', md: '11rem', lg: '12rem' }}
							height='auto'
						/>
						<List>
							{menuItems.map(({ text, icon, href }) => {
								const isActive = pathname === href || pathname.startsWith(`${href}/`);
								return (
									<ListItem
										key={text}
										sx={{ mb: { sm: 1, md: 2, lg: 4 } }}
										disablePadding>
										<Link
											href={href}
											style={{
												textDecoration: 'none',
												color: 'inherit',
												width: '100%',
											}}>
											<ListItemButton
												selected={isActive}
												sx={{
													px: 4,
													py: { sm: 2, md: 4, lg: 6 },
													borderLeft: 3,
													borderLeftColor: 'transparent',
													'&.Mui-selected': {
														borderLeftColor: 'background.primary',
													},
												}}>
												<ListItemIcon>
													<Box
														component={icon}
														width={{ sm: '1.1rem', md: '1.3rem', lg: '1.5rem' }}
														height='auto'
													/>
												</ListItemIcon>
												<ListItemText
													primary={text}
													//For MUI V7 - ListItemText no longer accepts primaryTypographyProps
													// slotProps={
													// 	isActive
													// 		? { variant: 'h3', color: 'text.icon' }
													// 		: { variant: 'h3', fontWeight: 400, color: 'text.primary' }
													// }
													primaryTypographyProps={
														isActive
															? { variant: 'h3', color: 'text.icon' }
															: { variant: 'h3', fontWeight: 400, color: 'text.primary' }
													}
												/>
											</ListItemButton>
										</Link>
									</ListItem>
								);
							})}
						</List>
					</Box>

					{/* Bottom Section - DropdownMenu */}
					<DropdownMenu />
				</Stack>
			</Drawer>
		</Box>
	);
}
