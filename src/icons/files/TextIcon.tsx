import React, { FC, SVGProps } from 'react';

interface TextIconProps extends SVGProps<SVGSVGElement> {
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

const TextIcon: FC<TextIconProps> = ({
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
			aria-label='Text Icon'
			role='img'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.64711 0.581055C2.06757 0.581055 0.787109 1.86152 0.787109 3.44105V21.5544C0.787109 23.1339 2.06757 24.4144 3.64711 24.4144H21.7604C23.34 24.4144 24.6204 23.1339 24.6204 21.5544V3.44105C24.6204 1.86152 23.34 0.581055 21.7604 0.581055H3.64711ZM16.243 8.00871C16.1207 7.98249 15.9852 7.96939 15.8367 7.96939H9.61021C9.47039 7.96939 9.33493 7.98249 9.20385 8.00871C9.07277 8.03493 8.9679 8.10921 8.88925 8.23156C8.8106 8.34516 8.77128 8.54179 8.77128 8.82143C8.77128 9.10108 8.8106 9.30206 8.88925 9.42441C8.9679 9.53802 9.07277 9.6123 9.20385 9.64726C9.33493 9.67347 9.47039 9.68658 9.61021 9.68658H11.7469V16.1621C11.7469 16.3281 11.76 16.4898 11.7862 16.6471C11.8124 16.7957 11.8954 16.918 12.0352 17.0141C12.1751 17.1015 12.4023 17.1452 12.7169 17.1452C13.0402 17.1452 13.2674 17.1015 13.3985 17.0141C13.5383 16.918 13.6214 16.7957 13.6476 16.6471C13.6825 16.4985 13.7 16.3412 13.7 16.1752V9.68658H15.8105C15.959 9.68658 16.0988 9.67347 16.2299 9.64726C16.361 9.62104 16.4659 9.54676 16.5445 9.42441C16.6319 9.30206 16.6756 9.10544 16.6756 8.83454C16.6756 8.54616 16.6319 8.34516 16.5445 8.23156C16.4659 8.10921 16.3654 8.03493 16.243 8.00871Z'
				fill='#6F8BB5'
			/>
		</svg>
	);
};

export default TextIcon;
