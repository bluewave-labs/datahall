import React, { FC, SVGProps } from 'react';

interface ArrowNarrowRightIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=14] - The width of the icon in pixels. Optional.
 * @param {number} [height=14] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const ArrowNarrowRightIcon: FC<ArrowNarrowRightIconProps> = ({
	width = 14,
	height = 14,
	color = '#667085',
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Arrow Narrow Right Icon'
			role='img'
			{...props}>
			<path
				d='M1.16699 6.99984H12.8337M12.8337 6.99984L7.00033 1.1665M12.8337 6.99984L7.00033 12.8332'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ArrowNarrowRightIcon;
