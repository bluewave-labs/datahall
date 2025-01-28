import React, { FC, SVGProps } from 'react';

type IconColor = 'error' | 'success' | 'disabled' | 'outline' | 'primaryOutline';

const colorMap: Record<IconColor, string> = {
	error: '#F04438',
	success: '#067647',
	disabled: '#D0D5DD',
	outline: '#344054',
	primaryOutline: '#1570ef',
};

interface CheckCircleIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: IconColor;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=24] - The width of the icon in pixels. Optional.
 * @param {number} [height=24] - The height of the icon in pixels. Optional.
 * @param {IconColor} [color='disabled'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const CheckCircleIcon: FC<CheckCircleIconProps> = ({
	width = 24,
	height = 24,
	color = 'disabled',
	...props
}) => {
	const isOutline = color === 'outline';
	const isPrimaryOutline = color === 'primaryOutline';
	const fillColor = isOutline || isPrimaryOutline ? 'none' : colorMap[color];
	const strokeColor = isOutline
		? colorMap['outline']
		: isPrimaryOutline
			? colorMap['primaryOutline']
			: 'none';

	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Check Circle Icon'
			role='img'
			{...props}>
			<circle
				cx='12'
				cy='12'
				r='11'
				fill={fillColor}
				stroke={strokeColor}
				strokeWidth={isOutline || isPrimaryOutline ? 2 : 0}
			/>

			<path
				d='M8 12L10.5 14.5L16 9'
				stroke={
					isOutline ? colorMap['outline'] : isPrimaryOutline ? colorMap['primaryOutline'] : 'white'
				}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CheckCircleIcon;
