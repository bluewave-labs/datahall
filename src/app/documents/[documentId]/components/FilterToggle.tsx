import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface FilterToggleProps {
	currentFilter: 'fromStart' | 'last30Days' | 'last7Days';
	onFilterChange: (period: 'fromStart' | 'last30Days' | 'last7Days') => void;
}

const FilterToggle = ({ currentFilter, onFilterChange }: FilterToggleProps) => (
	<ToggleButtonGroup
		value={currentFilter}
		exclusive
		onChange={(event, newPeriod) => {
			if (newPeriod !== null) {
				onFilterChange(newPeriod);
			}
		}}
		aria-label="Filter by period">
		<ToggleButton value="fromStart">From start</ToggleButton>
		<ToggleButton value="last30Days">Last 30 days</ToggleButton>
		<ToggleButton value="last7Days">Last 7 days</ToggleButton>
	</ToggleButtonGroup>
);

export default FilterToggle;
