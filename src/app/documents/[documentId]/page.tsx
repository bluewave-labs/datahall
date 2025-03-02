import { Container } from '@mui/material';
import DocumentView from './components/DocumentView';

export default async function page(props: { params: Promise<{ documentId: string }> }) {
	const { documentId } = await props.params;

	return (
		<Container sx={{ pb: 15 }}>
			<DocumentView documentId={documentId} />
		</Container>
	);
}
