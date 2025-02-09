import { Container, Typography } from '@mui/material';
import ContactsTable from './components/ContactsTable';

export default function ContactsPage() {
	return (
		<Container>
			<Typography
				variant='h2'
				mb={{ sm: 6, md: 8, lg: 10 }}>
				All contacts
			</Typography>
			<ContactsTable />
		</Container>
	);
}
