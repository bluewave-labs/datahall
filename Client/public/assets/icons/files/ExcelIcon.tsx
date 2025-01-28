import React, { FC, SVGProps } from 'react';

interface ExcelIconProps extends SVGProps<SVGSVGElement> {
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

const ExcelIcon: FC<ExcelIconProps> = ({
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
			aria-label='Excel Icon'
			role='img'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.81557 0.496094C2.23603 0.496094 0.955566 1.77656 0.955566 3.35609V21.4694C0.955566 23.049 2.23603 24.3294 3.81557 24.3294H21.9289C23.5084 24.3294 24.7889 23.049 24.7889 21.4694V3.35609C24.7889 1.77656 23.5084 0.496094 21.9289 0.496094H3.81557ZM16.1207 17.0523C16.2693 16.9998 16.444 16.8862 16.645 16.7114C16.9422 16.458 17.0864 16.2308 17.0776 16.0298C17.0776 15.8288 16.9553 15.5929 16.7106 15.322L14.1882 12.3765L16.7106 9.43632C16.9553 9.17415 17.0776 8.9382 17.0776 8.72847C17.0864 8.51874 16.9422 8.28715 16.645 8.03373C16.4528 7.85021 16.2824 7.73223 16.1338 7.6798C15.9853 7.62736 15.8411 7.63611 15.7012 7.70602C15.5614 7.77593 15.4085 7.91138 15.2425 8.11237L12.8895 10.86L10.5366 8.11237C10.3705 7.91138 10.2176 7.77593 10.0778 7.70602C9.93796 7.63611 9.79376 7.62736 9.6452 7.6798C9.49664 7.73223 9.32623 7.85021 9.13397 8.03373C8.84559 8.28715 8.7014 8.51874 8.7014 8.72847C8.7014 8.9382 8.82374 9.17415 9.06843 9.43632L11.5908 12.3765L9.06843 15.322C8.82374 15.5929 8.7014 15.8288 8.7014 16.0298C8.7014 16.2308 8.84559 16.458 9.13397 16.7114C9.33497 16.8862 9.50975 16.9998 9.65831 17.0523C9.80687 17.1047 9.95106 17.096 10.0909 17.026C10.2307 16.9561 10.3793 16.825 10.5366 16.6328L12.8895 13.8902L15.2425 16.6328C15.4085 16.825 15.5571 16.9561 15.6881 17.026C15.828 17.096 15.9722 17.1047 16.1207 17.0523Z'
				fill='#01AC49'
			/>
		</svg>
	);
};

export default ExcelIcon;
