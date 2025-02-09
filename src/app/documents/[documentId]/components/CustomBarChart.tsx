// Client/src/app/documents/document-details/components/CustomBarChart.tsx
'use client';

import { BarDataItem } from '@/utils/shared/models';
import { BarChart } from '@mui/x-charts/BarChart';

interface CustomBarChartProps {
	data: { month: string; Views: number; Downloads: number; date: Date }[];
}

export default function CustomBarChart({ data }: CustomBarChartProps) {
	const chartData = data;

	return (
		<BarChart
			width={1208}
			height={300}
			dataset={data}
			xAxis={[
				{
					scaleType: 'band',
					dataKey: 'month',
					...({ categoryGapRatio: 0.7 } as any),
					barGapRatio: 0.4,
				},
			]}
			series={[
				{ dataKey: 'Views', label: 'Views', color: '#01AFFF' },
				{ dataKey: 'Downloads', label: 'Downloads', color: '#1570EF' },
			]}
			slotProps={{
				legend: {
					itemMarkWidth: 12,
					itemMarkHeight: 12,
					itemGap: 20,
					padding: -5,
				},
			}}
		/>
	);
}
