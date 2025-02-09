import React, { FC, SVGProps } from 'react';

interface ChevronSelectorVerticalIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=16] - The width of the icon in pixels. Optional.
 * @param {number} [height=16] - The height of the icon in pixels. Optional.
 * @param {string} [color='#9A9B9B'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.33333] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const ChevronSelectorVerticalIcon: FC<ChevronSelectorVerticalIconProps> = ({
	width = 16,
	height = 16,
	color = '#9A9B9B',
	strokeWidth = 1.33333,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Chevron Selector Vertical Icon'
			role='img'
			{...props}>
			<g clipPath='url(#clip0_4303_3121)'>
				<path
					d='M4.66675 10L8.00008 13.3333L11.3334 10'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M4.66675 6.00008L8.00008 2.66675L11.3334 6.00008'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_4303_3121'>
					<rect
						width='16'
						height='16'
						fill='white'
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default ChevronSelectorVerticalIcon;
