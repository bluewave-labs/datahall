import { Dropdown, Paginator } from '@/components';

import { TrashIcon } from '@/icons';

import { User } from '@/shared/models';

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Box,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';

interface Props {
	users: User[];
	page: number;
	setPage: (page: number) => void;
	filterRole: 'All' | 'Administrator' | 'Member';
	pageSize: number;
	totalUsers: number;
}

const UserTable = ({ users, page, setPage, pageSize, totalUsers }: Props) => (
	<>
		<TableContainer component={Paper}>
			<Table aria-label='User Table'>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: '30%' }}>Name</TableCell>
						<TableCell sx={{ width: '32%' }}>Email</TableCell>
						<TableCell sx={{ width: '30%' }}>Role</TableCell>
						<TableCell sx={{ width: '8%' }}>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user, index) => (
						<TableRow key={index}>
							<TableCell>
								<Typography variant='body1'>{user.name}</Typography>
								<Typography variant='caption'>Created {user.createdAt}</Typography>
							</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Dropdown
									initialValue={user.role}
									variant='standard'
									options={[
										{ value: 'Administrator', label: 'Administrator' },
										{ value: 'Member', label: 'Member' },
									]}
									onValueChange={(newRole) => {
										console.log(`Role changed to ${newRole} for user ${user.name}`);
									}}
								/>
							</TableCell>
							<TableCell>
								<IconButton>
									<Box
										component={TrashIcon}
										width={{ sm: '1rem', md: '1.1rem', lg: '1.18rem' }}
										height='auto'
									/>
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
		<Paginator
			page={page}
			totalPages={Math.ceil(totalUsers / pageSize)}
			onPageChange={setPage}
			pageSize={pageSize}
			totalItems={totalUsers}
		/>
	</>
);

export default UserTable;
