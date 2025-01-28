import React, { FC, SVGProps } from 'react';

interface ArrowNarrowLeftIconProps extends SVGProps<SVGSVGElement> {
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

const ArrowNarrowLeftIcon: FC<ArrowNarrowLeftIconProps> = ({
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
			aria-label='Arrow Narrow Left Icon'
			role='img'
			{...props}>
			<path
				d='M12.8332 6.99984H1.1665M1.1665 6.99984L6.99984 12.8332M1.1665 6.99984L6.99984 1.1665'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default ArrowNarrowLeftIcon;
