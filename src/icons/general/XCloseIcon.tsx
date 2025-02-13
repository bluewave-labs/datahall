import React, { FC, SVGProps } from 'react';

interface XCloseIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=36] - The width of the icon in pixels. Optional.
 * @param {number} [height=36] - The height of the icon in pixels. Optional.
 * @param {string} [color='#98A2B3'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.66667] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const XCloseIcon: FC<XCloseIconProps> = ({
	width = 36,
	height = 36,
	color = '#98A2B3',
	strokeWidth = 1.66667,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 36 36'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='X Close Icon'
			role='img'
			{...props}>
			<path
				d='M23 13L13 23M13 13L23 23'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default XCloseIcon;
