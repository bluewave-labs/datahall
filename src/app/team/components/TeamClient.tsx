'use client';
import { useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';

import ModalWrapper from '@/components/ModalWrapper';

import { dummyTeams } from '@/seed/dummyTeams';

import FilterToggle from './FilterToggle';
import UserTable from './UserTable';

import { useModal } from '@/hooks';

import { User } from '@/utils/shared/models';

export default function TeamClient() {
	const inviteModal = useModal();

	const [filterRole, setFilterRole] = useState<'All' | 'Administrator' | 'Member'>('All');
	const [page, setPage] = useState(1);
	const [users, setUsers] = useState<User[]>([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const pageSize = 6;

	useEffect(() => {
		const fetchUsers = () => {
			const filteredUsers =
				filterRole === 'All' ? dummyTeams : dummyTeams.filter((user) => user.role === filterRole);

			setTotalUsers(filteredUsers.length);
			setUsers(filteredUsers.slice((page - 1) * pageSize, page * pageSize));
		};

		fetchUsers();
	}, [filterRole, page]);

	const handleFilterChange = (role: 'All' | 'Administrator' | 'Member') => {
		setFilterRole(role);
		setPage(1); // Reset to page 1 when the filter changes
	};

	return (
		<>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<FilterToggle
					currentFilter={filterRole}
					onFilterChange={handleFilterChange}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={inviteModal.openModal}>
					Invite team member
				</Button>
			</Box>
			<Box marginTop='2rem'>
				<UserTable
					users={users}
					page={page}
					setPage={setPage}
					filterRole={filterRole}
					pageSize={pageSize}
					totalUsers={totalUsers}
				/>
			</Box>

			<ModalWrapper
				variant='invite'
				title='Invite new team member'
				description='When you add a new team member, they will get access to all monitors.'
				confirmButtonText='Send invite'
				toggleModal={inviteModal.closeModal}
				open={inviteModal.isOpen}
				onClose={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		</>
	);
}
