import React, { FC, SVGProps } from 'react';

type IconColor = 'error' | 'success' | 'disabled' | 'outline';

const colorMap: Record<IconColor, string> = {
	error: '#F04438',
	success: '#067647',
	disabled: '#D0D5DD',
	outline: '#344054',
};

interface XCircleIconProps extends SVGProps<SVGSVGElement> {
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

const XCircleIcon: FC<XCircleIconProps> = ({
	width = 24,
	height = 24,
	color = 'disabled',
	...props
}) => {
	const isOutline = color === 'outline';
	const fillColor = isOutline ? 'none' : colorMap[color];
	const strokeColor = isOutline ? colorMap['outline'] : colorMap[color];

	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill={fillColor}
			xmlns='http://www.w3.org/2000/svg'
			aria-label='X Circle Icon'
			role='img'
			{...props}>
			<circle
				cx='12'
				cy='12'
				r='11'
				fill={fillColor}
				stroke={strokeColor}
				strokeWidth={isOutline ? 2 : 0}
			/>
			<path
				d='M15 9L9 15M9 9L15 15'
				stroke={isOutline ? colorMap['outline'] : 'white'}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default XCircleIcon;
