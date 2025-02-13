import React, { FC, SVGProps } from 'react';

interface SquareIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=20] - The width of the icon in pixels. Optional.
 * @param {number} [height=20] - The height of the icon in pixels. Optional.
 * @param {string} [color='#98A2B3'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const SquareIcon: FC<SquareIconProps> = ({
	width = 20,
	height = 20,
	color = '#98A2B3',
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Square Icon'
			role='img'
			{...props}>
			<path
				d='M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H14C17.0376 0.5 19.5 2.96243 19.5 6V14C19.5 17.0376 17.0376 19.5 14 19.5H6C2.96243 19.5 0.5 17.0376 0.5 14V6Z'
				stroke={color}
			/>
		</svg>
	);
};

export default SquareIcon;
