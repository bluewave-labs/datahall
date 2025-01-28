import React, { FC, SVGProps } from 'react';

interface EyeIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=24] - The width of the icon in pixels. Optional.
 * @param {number} [height=24] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const EyeIcon: FC<EyeIconProps> = ({
	width = 24,
	height = 24,
	color = '#667085',
	strokeWidth = 1,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Eye Icon'
			role='img'
			{...props}>
			<path
				d='M12 5C17.105 5 20.455 9.505 21.581 11.287C21.717 11.503 21.785 11.61 21.823 11.777C21.852 11.902 21.852 12.099 21.823 12.224C21.785 12.39 21.716 12.498 21.579 12.716C20.822 13.857 17.105 19 12 19C6.895 19 3.546 14.495 2.42 12.713C2.284 12.498 2.216 12.39 2.178 12.224C2.149 12.099 2.149 11.902 2.178 11.777C2.216 11.61 2.284 11.503 2.421 11.285C3.546 9.505 6.895 5 12 5Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle
				cx='12'
				cy='12'
				r='3'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default EyeIcon;
