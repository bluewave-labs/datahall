import React, { FC, SVGProps } from 'react';
interface CopyIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=15] - The width of the icon in pixels. Optional.
 * @param {number} [height=15] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const CopyIcon: FC<CopyIconProps> = ({
	width = 15,
	height = 15,
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
			aria-label='Copy Icon'
			role='img'
			{...props}>
			<path
				d='M2.8 8.8C2.24087 8.8 1.96131 8.8 1.74078 8.70866C1.44675 8.58686 1.21314 8.35325 1.09134 8.05922C1 7.83869 1 7.55913 1 7V2.92C1 2.24794 1 1.91191 1.13079 1.65521C1.24584 1.42942 1.42942 1.24584 1.65521 1.13079C1.91191 1 2.24794 1 2.92 1H7C7.55913 1 7.83869 1 8.05922 1.09134C8.35325 1.21314 8.58686 1.44675 8.70866 1.74078C8.8 1.96131 8.8 2.24087 8.8 2.8M7.12 13H11.08C11.7521 13 12.0881 13 12.3448 12.8692C12.5706 12.7542 12.7542 12.5706 12.8692 12.3448C13 12.0881 13 11.7521 13 11.08V7.12C13 6.44794 13 6.11191 12.8692 5.85521C12.7542 5.62942 12.5706 5.44584 12.3448 5.33079C12.0881 5.2 11.7521 5.2 11.08 5.2H7.12C6.44794 5.2 6.11191 5.2 5.85521 5.33079C5.62942 5.44584 5.44584 5.62942 5.33079 5.85521C5.2 6.11191 5.2 6.44794 5.2 7.12V11.08C5.2 11.7521 5.2 12.0881 5.33079 12.3448C5.44584 12.5706 5.62942 12.7542 5.85521 12.8692C6.11191 13 6.44794 13 7.12 13Z'
				stroke={color}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CopyIcon;
