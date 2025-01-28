import React, { FC, SVGProps } from 'react';

interface ChevronUpIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=20] - The width of the icon in pixels. Optional.
 * @param {number} [height=20] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.66667] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const ChevronUpIcon: FC<ChevronUpIconProps> = ({
	width = 20,
	height = 20,
	color = '#667085',
	strokeWidth = 1.66667,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Chevron Up Icon'
			role='img'
			{...props}>
			<path
				d='M18 15L12 9L6 15'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ChevronUpIcon;
