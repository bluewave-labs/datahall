import React, { FC, SVGProps } from 'react';

interface LockIconProps extends SVGProps<SVGSVGElement> {
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

const LockIcon: FC<LockIconProps> = ({
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
			viewBox='0 0 22 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Lock Icon'
			role='img'
			{...props}>
			<path
				d='M16.8337 9.66667V7.33333C16.8337 4.11167 14.222 1.5 11.0003 1.5C7.77867 1.5 5.16699 4.11167 5.16699 7.33333V9.66667M11.0003 14.9167V17.25M7.26699 22.5H14.7337C16.6938 22.5 17.6739 22.5 18.4226 22.1185C19.0812 21.783 19.6166 21.2475 19.9522 20.589C20.3337 19.8403 20.3337 18.8602 20.3337 16.9V15.2667C20.3337 13.3065 20.3337 12.3264 19.9522 11.5777C19.6166 10.9191 19.0812 10.3837 18.4226 10.0481C17.6739 9.66667 16.6938 9.66667 14.7337 9.66667H7.26699C5.30681 9.66667 4.32672 9.66667 3.57803 10.0481C2.91946 10.3837 2.38403 10.9191 2.04847 11.5777C1.66699 12.3264 1.66699 13.3065 1.66699 15.2667V16.9C1.66699 18.8602 1.66699 19.8403 2.04847 20.589C2.38403 21.2475 2.91946 21.783 3.57803 22.1185C4.32672 22.5 5.30681 22.5 7.26699 22.5Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default LockIcon;
