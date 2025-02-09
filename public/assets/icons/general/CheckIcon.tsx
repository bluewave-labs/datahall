import React, { FC, SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=18] - The width of the icon in pixels. Optional.
 * @param {number} [height=15] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const CheckIcon: FC<CheckIconProps> = ({
	width = 18,
	height = 15,
	color = '#667085',
	strokeWidth = 1,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 18 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Check Icon'
			role='img'
			{...props}>
			<path
				d='M17 1L6 12L1 7'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CheckIcon;
