import React, { FC, SVGProps } from 'react';

interface PencilIconProps extends SVGProps<SVGSVGElement> {
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

const PencilIcon: FC<PencilIconProps> = ({
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
			aria-label='Edit Icon'
			role='img'
			{...props}>
			<g clipPath='url(#clip0_77_2579)'>
				<path
					d='M1.66663 14.3334L5.36614 12.9105C5.60277 12.8195 5.72108 12.774 5.83177 12.7146C5.93009 12.6618 6.02383 12.6009 6.11199 12.5324C6.21124 12.4554 6.30088 12.3658 6.48015 12.1865L14 4.66671C14.7364 3.93033 14.7364 2.73642 14 2.00004C13.2636 1.26366 12.0697 1.26366 11.3333 2.00004L3.81348 9.51985C3.63421 9.69912 3.54457 9.78876 3.46755 9.88801C3.39914 9.97617 3.33823 10.0699 3.28545 10.1682C3.22603 10.2789 3.18053 10.3972 3.08951 10.6339L1.66663 14.3334ZM1.66663 14.3334L3.03871 10.766C3.13689 10.5107 3.18598 10.3831 3.27019 10.3246C3.34377 10.2735 3.43483 10.2542 3.52282 10.271C3.62351 10.2902 3.72021 10.3869 3.91361 10.5803L5.41967 12.0864C5.61307 12.2798 5.70977 12.3765 5.729 12.4772C5.74581 12.5652 5.72648 12.6562 5.67539 12.7298C5.61692 12.814 5.48928 12.8631 5.23401 12.9613L1.66663 14.3334Z'
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_77_2579'>
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

export default PencilIcon;
