import React, { FC, SVGProps } from 'react';

interface GeneralIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=25] - The width of the icon in pixels. Optional.
 * @param {number} [height=25] - The height of the icon in pixels. Optional.
 * @param {string} [color='white'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.90667] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const GeneralIcon: FC<GeneralIconProps> = ({
	width = 25,
	height = 25,
	color = 'white',
	strokeWidth = 1.90667,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 25 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='General Icon'
			role='img'
			{...props}>
			<path
				d='M.872 3.646a2.98 2.98 0 0 1 2.98-2.98h17.874a2.98 2.98 0 0 1 2.98 2.98V21.52a2.979 2.979 0 0 1-2.98 2.979H3.851a2.979 2.979 0 0 1-2.979-2.98V3.647Z'
				fill='#BCC0D1'
			/>
			<path
				d='M14.08 11.938h-3.873m1.291 2.582h-1.29m5.163-5.164h-5.164m7.746-.13v6.714c0 1.084 0 1.627-.21 2.04-.186.365-.483.661-.847.847-.414.211-.957.211-2.041.211h-4.131c-1.085 0-1.627 0-2.041-.21a1.937 1.937 0 0 1-.846-.847c-.212-.414-.212-.957-.212-2.041V9.227c0-1.085 0-1.627.212-2.041.185-.365.481-.66.846-.847.414-.21.956-.21 2.04-.21h4.132c1.085 0 1.627 0 2.04.21.365.186.662.482.847.847.211.414.211.956.211 2.04Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default GeneralIcon;
