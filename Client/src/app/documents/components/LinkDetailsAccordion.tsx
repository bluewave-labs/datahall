import CustomCheckbox from '@/components/CustomCheckbox';
import CustomTextField from '@/components/CustomTextField';
import { Box, IconButton, Typography } from '@mui/material';
import CopyIcon from '../../../../public/assets/icons/documentPage/CopyIcon';

interface Props {
	formValues: any;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkDetailsAccordion = ({ formValues, handleInputChange }: Props) => (
	<Box py={4}>
		{/* <Typography variant="body1">Link URL</Typography>
		<Typography variant="body2" sx={{ mb: 5 }}>
			This is an automatically generated link address.
		</Typography>
		<Box display="flex" alignItems="center" justifyContent="space-between">
			<CustomTextField
				minWidth={460}
				value="https://app.bluewavelabs.ca/settings/general"
				onChange={() => {}}
				placeholder=""
			/>
			<IconButton size="large">
				<CopyIcon />
			</IconButton>
		</Box> */}
		{/* <Box marginY={13}>
			<Typography>Friendly Link Name</Typography>
			<CustomTextField
				minWidth={460}
				value={formValues.friendlyName}
				onChange={handleInputChange}
				name="friendlyName"
				placeholder="Enter a friendly name for the link"
			/>
		</Box> */}
		<Typography variant="body1">Status</Typography>
		<CustomCheckbox
			checked={formValues.isPublic}
			onChange={handleInputChange}
			name="isPublic"
			label="Allow anyone with this link to preview and download"
		/>
	</Box>
);

export default LinkDetailsAccordion;
