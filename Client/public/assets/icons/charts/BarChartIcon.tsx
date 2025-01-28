import React, { FC, SVGProps } from 'react';

interface BarChartIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=14] - The width of the icon in pixels. Optional.
 * @param {number} [height=14] - The height of the icon in pixels. Optional.
 * @param {string} [color='#939393'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const BarChartIcon: FC<BarChartIconProps> = ({
	width = 14,
	height = 14,
	color = '#939393',
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Bar Chart Icon'
			role='img'
			{...props}>
			<path
				d='M1 6.33333L1 13M9 6.33333L9 13M5 1L5 13M13 1V13'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default BarChartIcon;
