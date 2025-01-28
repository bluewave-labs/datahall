import React, { FC, SVGProps } from 'react';

interface MenuIconProps extends SVGProps<SVGSVGElement> {
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
 * @param {string} [color='#344054ab'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=2] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const MenuIcon: FC<MenuIconProps> = ({
	width = 20,
	height = 20,
	color = '#344054ab',
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
			aria-label='Menu Icon'
			role='img'
			{...props}>
			<path
				d='M0 0h24v24H0z'
				fill='none'
			/>
			<line
				x1='3'
				y1='6'
				x2='21'
				y2='6'
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<line
				x1='3'
				y1='12'
				x2='21'
				y2='12'
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<line
				x1='3'
				y1='18'
				x2='21'
				y2='18'
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
};

export default MenuIcon;
