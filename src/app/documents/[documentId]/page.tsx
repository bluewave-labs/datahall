import { Container } from '@mui/material';
import DocumentView from './components/DocumentView';

export default function page({ params }: { params: { documentId: string } }) {
	const { documentId } = params;
	return (
		<Container sx={{ pb: 15 }}>
			<DocumentView documentId={documentId} />
		</Container>
	);
}
