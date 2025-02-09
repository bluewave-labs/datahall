import { Container, Divider } from '@mui/material';
import BrandingSetting from './components/BrandingSetting';
import SettingsTabs from './components/SettingsTabs';

export default function SettingsPage() {
	return (
		<Container>
			<SettingsTabs />
			<Divider sx={{ mb: 8 }} />
			<BrandingSetting />
		</Container>
	);
}
