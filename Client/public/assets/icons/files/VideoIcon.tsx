import React, { FC, SVGProps } from 'react';

interface VideoIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=25] - The width of the icon in pixels. Optional.
 * @param {number} [height=25] - The height of the icon in pixels. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const VideoIcon: FC<VideoIconProps> = ({
	width = 25,
	height = 25,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Video Icon'
			role='img'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M2.90053 0.581055C1.32099 0.581055 0.0405273 1.86152 0.0405273 3.44105V21.5544C0.0405273 23.1339 1.32099 24.4144 2.90053 24.4144H21.0139C22.5934 24.4144 23.8739 23.1339 23.8739 21.5544V3.44105C23.8739 1.86152 22.5934 0.581055 21.0139 0.581055H2.90053ZM7.18603 18.3375C7.42256 18.4561 7.54083 18.4561 7.77736 18.4561C8.0139 18.4561 8.13216 18.4561 8.3687 18.3375L16.6474 13.5945C17.0022 13.3574 17.2387 13.0017 17.2387 12.5274C17.2387 12.0531 17.0022 11.6973 16.6474 11.4602L8.3687 6.71725C8.0139 6.4801 7.54083 6.4801 7.18603 6.71725C6.83123 6.9544 6.59469 7.31012 6.59469 7.78441V17.2703C6.59469 17.7446 6.83123 18.1003 7.18603 18.3375ZM13.6907 12.5274L8.96003 15.2546V9.80017L13.6907 12.5274Z'
				fill='#844FDA'
			/>
		</svg>
	);
};

export default VideoIcon;
