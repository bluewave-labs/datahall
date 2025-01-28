import React, { FC, SVGProps } from 'react';

interface FileDownloadIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=28] - The width of the icon in pixels. Optional.
 * @param {number} [height=28] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=2] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const FileDownloadIcon: FC<FileDownloadIconProps> = ({
	width = 28,
	height = 28,
	color = '#667085',
	strokeWidth = 2,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 28 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='File Download Icon'
			role='img'
			{...props}>
			<path
				d='M16.3332 2.64771V7.46667C16.3332 8.12006 16.3332 8.44676 16.4603 8.69632C16.5722 8.91585 16.7507 9.09432 16.9702 9.20618C17.2197 9.33333 17.5464 9.33333 18.1998 9.33333H23.0188M10.4998 17.4999L13.9998 20.9999M13.9998 20.9999L17.4998 17.4999M13.9998 20.9999L13.9998 13.9999M16.3332 2.33325H10.2665C8.30632 2.33325 7.32623 2.33325 6.57754 2.71473C5.91897 3.05029 5.38354 3.58572 5.04798 4.24429C4.6665 4.99298 4.6665 5.97307 4.6665 7.93325V20.0666C4.6665 22.0268 4.6665 23.0069 5.04798 23.7556C5.38354 24.4141 5.91897 24.9496 6.57754 25.2851C7.32623 25.6666 8.30632 25.6666 10.2665 25.6666H17.7332C19.6934 25.6666 20.6734 25.6666 21.4221 25.2851C22.0807 24.9496 22.6161 24.4141 22.9517 23.7556C23.3332 23.0069 23.3332 22.0268 23.3332 20.0666V9.33325L16.3332 2.33325Z'
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default FileDownloadIcon;
