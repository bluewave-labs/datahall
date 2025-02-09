import { Container, Divider, Typography } from '@mui/material';
import OrganizationName from './components/OrganizationName';
import TeamClient from './components/TeamClient';

export default function TeamPage() {
	return (
		<Container>
			<Typography variant="h2">Team</Typography>
			<Divider sx={{ mt: 3, mb: 10 }} />
			<Typography variant="body1" sx={{ mb: 15 }}>
				Set up your team here.
			</Typography>

			<OrganizationName />

			<Divider sx={{ my: 15 }} />
			<Typography variant="h4" mb={25}>
				Team Members
			</Typography>

			<TeamClient />
		</Container>
	);
}
