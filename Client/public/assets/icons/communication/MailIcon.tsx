import React, { FC, SVGProps } from 'react';

interface MailIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=28] - The width of the icon in pixels. Optional.
 * @param {number} [height=28] - The height of the icon in pixels. Optional.
 * @param {string} [color='#344054'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=2] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const MailIcon: FC<MailIconProps> = ({
	width = 28,
	height = 28,
	color = '#344054',
	strokeWidth = 2,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 26 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Mail Icon'
			role='img'
			{...props}>
			<path
				d='M1.33301 5.1665L10.8587 11.8345C11.6301 12.3745 12.0158 12.6445 12.4353 12.749C12.8059 12.8414 13.1935 12.8414 13.564 12.749C13.9836 12.6445 14.3692 12.3745 15.1406 11.8345L24.6663 5.1665M6.93301 20.3332H19.0663C21.0265 20.3332 22.0066 20.3332 22.7553 19.9517C23.4139 19.6161 23.9493 19.0807 24.2849 18.4221C24.6663 17.6734 24.6663 16.6934 24.6663 14.7332V7.2665C24.6663 5.30632 24.6663 4.32623 24.2849 3.57754C23.9493 2.91897 23.4139 2.38354 22.7553 2.04798C22.0066 1.6665 21.0265 1.6665 19.0663 1.6665H6.93301C4.97282 1.6665 3.99273 1.6665 3.24404 2.04798C2.58547 2.38354 2.05004 2.91897 1.71448 3.57754C1.33301 4.32623 1.33301 5.30632 1.33301 7.2665V14.7332C1.33301 16.6934 1.33301 17.6734 1.71448 18.4221C2.05004 19.0807 2.58547 19.6161 3.24404 19.9517C3.99273 20.3332 4.97282 20.3332 6.93301 20.3332Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default MailIcon;
