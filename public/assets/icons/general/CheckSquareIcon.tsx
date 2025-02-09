import React, { FC, SVGProps } from 'react';

interface CheckSquareIconProps extends SVGProps<SVGSVGElement> {
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
 * @param {string} [color='white'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=2] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const CheckSquareIcon: FC<CheckSquareIconProps> = ({
	width = 20,
	height = 20,
	color = 'white',
	strokeWidth = 2,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Check Square Icon'
			role='img'
			{...props}>
			<path
				d='M0 6a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6Z'
				fill='#175CD3'
			/>
			<path
				d='M14.667 6.5 8.25 12.917 5.333 10'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CheckSquareIcon;
