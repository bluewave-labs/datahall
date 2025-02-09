import React, { FC, SVGProps } from 'react';

interface LinkBrokenIconProps extends SVGProps<SVGSVGElement> {
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
 * @param {string} [color='#FF4747'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=2] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const LinkBrokenIcon: FC<LinkBrokenIconProps> = ({
	width = 24,
	height = 24,
	color = '#FF4747',
	strokeWidth = 2,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Broken Link Icon'
			role='img'
			{...props}>
			<path
				d='M8.5 15.5L15.5 8.49998M9 4V2M15 20V22M4 9H2M20 15H22M4.91421 4.91421L3.5 3.5M19.0858 19.0857L20.5 20.4999M12 17.6568L9.87871 19.7781C8.31662 21.3402 5.78396 21.3402 4.22186 19.7781C2.65976 18.216 2.65976 15.6833 4.22186 14.1212L6.34318 11.9999M17.6569 11.9999L19.7782 9.87859C21.3403 8.31649 21.3403 5.78383 19.7782 4.22174C18.2161 2.65964 15.6835 2.65964 14.1214 4.22174L12 6.34306'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default LinkBrokenIcon;
