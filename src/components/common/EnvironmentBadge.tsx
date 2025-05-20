'use client';

import { Chip, ChipProps } from '@mui/material';

const actualEnv = process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT ?? 'unknown';

const envMap: Record<string, { label: string; color: ChipProps['color'] }> = {
	local: { label: 'Dev', color: 'warning' }, // green
	development: { label: 'Preview', color: 'success' }, // yellow
	production: { label: 'BETA', color: 'primary' }, // red
};

const EnvironmentBadge = () => {
	const { label, color } = envMap[actualEnv] ?? { label: actualEnv, color: '#616161' };

	return (
		<Chip
			sx={{
				position: 'fixed',
				top: 10,
				right: 10,
				zIndex: 9999,
				fontWeight: '600',
			}}
			label={label}
			color={color}
			variant='outlined'
			clickable
		/>
	);
};

export default EnvironmentBadge;
