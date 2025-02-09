import { TableCell, TableRow, Typography } from '@mui/material';

import { Contact } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';

interface Props {
	contact: Contact;
}

export default function ContactsTableRow({ contact }: Props) {
	return (
		<TableRow>
			<TableCell sx={{ pl: '2rem' }}>
				{contact.name ? contact.name : 'N/A'}
				<br />
				<Typography variant='caption'>{contact.email ? contact.email : 'N/A'}</Typography>
			</TableCell>
			<TableCell sx={{ pl: '1rem' }}>{contact.lastViewedLink}</TableCell>
			<TableCell sx={{ textAlign: 'center' }}>
				{formatDateTime(contact.lastActivity, { includeTime: true })}
			</TableCell>
			<TableCell sx={{ textAlign: 'center' }}>{contact.totalVisits}</TableCell>
		</TableRow>
	);
}
