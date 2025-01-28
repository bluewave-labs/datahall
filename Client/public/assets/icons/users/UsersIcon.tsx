import React, { FC, SVGProps } from 'react';

interface UsersIconProps extends SVGProps<SVGSVGElement> {
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
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.5] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const UsersIcon: FC<UsersIconProps> = ({
	width = 16,
	height = 16,
	color = '#667085',
	strokeWidth = 1.5,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Users Icon'
			role='img'
			{...props}>
			<path
				d='M14.6667 14V12.6667C14.6667 11.4241 13.8168 10.38 12.6667 10.084M10.3333 2.19384C11.3106 2.58943 12 3.54754 12 4.66667C12 5.78579 11.3106 6.7439 10.3333 7.13949M11.3333 14C11.3333 12.7575 11.3333 12.1362 11.1303 11.6462C10.8597 10.9928 10.3406 10.4736 9.68715 10.203C9.19709 10 8.57584 10 7.33333 10H5.33333C4.09082 10 3.46956 10 2.97951 10.203C2.3261 10.4736 1.80697 10.9928 1.53632 11.6462C1.33333 12.1362 1.33333 12.7575 1.33333 14M9 4.66667C9 6.13943 7.80609 7.33333 6.33333 7.33333C4.86057 7.33333 3.66666 6.13943 3.66666 4.66667C3.66666 3.19391 4.86057 2 6.33333 2C7.80609 2 9 3.19391 9 4.66667Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default UsersIcon;
