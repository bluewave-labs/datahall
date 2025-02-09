import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface Props {
	currentFilter: 'All' | 'Administrator' | 'Member';
	onFilterChange: (role: 'All' | 'Administrator' | 'Member') => void;
}

const FilterToggle = ({ currentFilter, onFilterChange }: Props) => (
	<ToggleButtonGroup
		value={currentFilter}
		exclusive
		onChange={(event, newRole) => {
			if (newRole !== null) {
				onFilterChange(newRole);
			}
		}}
		aria-label="Filter by role"
		size="small">
		<ToggleButton value="All">All</ToggleButton>
		<ToggleButton value="Administrator">Administrator</ToggleButton>
		<ToggleButton value="Member">Member</ToggleButton>
	</ToggleButtonGroup>
);

export default FilterToggle;
