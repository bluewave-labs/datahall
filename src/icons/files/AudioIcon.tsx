import React, { FC, SVGProps } from 'react';

interface AudioIconProps extends SVGProps<SVGSVGElement> {
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

const AudioIcon: FC<AudioIconProps> = ({
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
			aria-label='Audio Icon'
			role='img'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.81557 0.581055C2.23603 0.581055 0.955566 1.86152 0.955566 3.44105V21.5544C0.955566 23.1339 2.23603 24.4144 3.81557 24.4144H21.9289C23.5084 24.4144 24.7889 23.1339 24.7889 21.5544V3.44105C24.7889 1.86152 23.5084 0.581055 21.9289 0.581055H3.81557ZM17.7546 6.54846C17.9964 6.51107 18.2432 6.59085 18.4202 6.75789C18.5972 6.92743 18.687 7.16678 18.6695 7.40862L17.9416 15.1052L17.94 15.1259C17.9331 15.2209 17.9263 15.3139 17.9216 15.4069C17.8593 16.454 16.9917 17.2842 15.9297 17.2842C14.8128 17.2842 13.9128 16.3692 13.9353 15.2473C13.9577 14.1702 14.8477 13.2976 15.9247 13.2951C16.1316 13.2951 16.3286 13.325 16.5155 13.3824L16.8646 9.5852L11.7065 10.3431L11.158 16.282C11.148 16.3792 11.143 16.4739 11.1381 16.5712C11.0807 17.6208 10.2107 18.4561 9.14612 18.4561C8.01677 18.4561 7.10432 17.5161 7.15418 16.3742C7.19906 15.342 8.03921 14.5068 9.07133 14.4694C9.2957 14.4619 9.5126 14.4918 9.71703 14.5517L10.2954 8.2613C10.3278 7.8948 10.6095 7.59811 10.9735 7.54575L17.7546 6.54846Z'
				fill='#00BECA'
			/>
		</svg>
	);
};

export default AudioIcon;
