import React, { FC, SVGProps } from 'react';

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=15] - The width of the icon in pixels. Optional.
 * @param {number} [height=15] - The height of the icon in pixels. Optional.
 * @param {string} [color='#9A9B9B'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.66667] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const ChevronDownIcon: FC<ChevronDownIconProps> = ({
	width = 15,
	height = 15,
	color = '#9A9B9B',
	strokeWidth = 1.66667,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Chevron Down Icon'
			role='img'
			{...props}>
			<path
				d='M5 7.5L10 12.5L15 7.5'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ChevronDownIcon;
