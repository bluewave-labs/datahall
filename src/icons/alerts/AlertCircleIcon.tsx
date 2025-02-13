import React, { FC, SVGProps } from 'react';

interface AlertCircleIconProps extends SVGProps<SVGSVGElement> {
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=80] - The width of the icon in pixels. Optional.
 * @param {number} [height=80] - The height of the icon in pixels. Optional.
 * @param {string} [color='#db504a'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=2] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const AlertCircleIcon: FC<AlertCircleIconProps> = ({
	width = 80,
	height = 80,
	color = '#db504a',
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
			aria-label='Alert Circle Icon'
			role='img'
			{...props}>
			<path
				d='M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default AlertCircleIcon;
