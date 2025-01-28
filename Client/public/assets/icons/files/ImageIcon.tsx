import React, { FC, SVGProps } from 'react';

interface ImageIconProps extends SVGProps<SVGSVGElement> {
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

const ImageIcon: FC<ImageIconProps> = ({
	width = 25,
	height = 25,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 25 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='Image Icon'
			role='img'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.73207 0.581055C2.15254 0.581055 0.87207 1.86152 0.87207 3.44105V21.5544C0.87207 23.1339 2.15254 24.4144 3.73207 24.4144H21.8454C23.4249 24.4144 24.7054 23.1339 24.7054 21.5544V3.44105C24.7054 1.86152 23.4249 0.581055 21.8454 0.581055H3.73207ZM9.62192 14.942C10.0861 15.5612 10.5513 16.1819 10.9278 16.1819C11.6354 16.1819 12.4177 15.0179 13.2172 13.8282C14.3063 12.2078 15.4273 10.5396 16.4352 11.7004C17.069 12.4306 17.7221 14.0286 18.2975 15.4363C18.4979 15.9267 18.6888 16.3939 18.8662 16.7933V17.3597C18.8662 18.0319 18.3229 18.5752 17.6507 18.5752H7.92674C7.60437 18.5752 7.2952 18.4472 7.06725 18.2192C6.8393 17.9913 6.71124 17.6821 6.71124 17.3597V16.9598C6.94155 16.4435 7.17618 15.8623 7.38868 15.3359C7.59788 14.8177 7.78564 14.3526 7.92674 14.0548C8.32577 13.2128 8.97276 14.0759 9.62192 14.942ZM10.3577 8.24347C10.3577 9.25112 9.54214 10.0667 8.53449 10.0667C7.52684 10.0667 6.71124 9.25112 6.71124 8.24347C6.71124 7.23582 7.52684 6.42022 8.53449 6.42022C9.54214 6.42022 10.3577 7.23582 10.3577 8.24347Z'
				fill='#FF3093'
			/>
		</svg>
	);
};

export default ImageIcon;
