import React, { FC, SVGProps } from 'react';

interface FilePlusIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=128] - The width of the icon in pixels. Optional.
 * @param {number} [height=128] - The height of the icon in pixels. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const FilePlusIcon: FC<FilePlusIconProps> = ({
	width = 128,
	height = 128,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 135 142'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-label='File Plus Icon'
			role='img'
			{...props}>
			<g
				filter='url(#a)'
				shapeRendering='crispEdges'>
				<rect
					width='99'
					height='107'
					x='18'
					y='14'
					fill='#fff'
					fillOpacity='.5'
					rx='4'
				/>
				<rect
					width='98.128'
					height='106.128'
					x='18.436'
					y='14.436'
					stroke='#F2F2F2'
					strokeWidth='.872'
					rx='3.564'
				/>
			</g>
			<g
				stroke='#A3A3A3'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				clipPath='url(#b)'>
				<path d='M56 82h22M67 71v22' />
			</g>
			<rect
				width='73'
				height='10'
				x='29'
				y='29'
				fill='#E4E5E9'
				fillOpacity='.5'
				rx='4'
			/>
			<rect
				width='62'
				height='10'
				x='29'
				y='45'
				fill='#E4E5E9'
				fillOpacity='.5'
				rx='4'
			/>
			<defs>
				<clipPath id='b'>
					<path
						fill='#fff'
						d='M0 0h32v32H0z'
						transform='translate(51 66)'
					/>
				</clipPath>
				<filter
					id='a'
					width='133.894'
					height='141.894'
					x='.553'
					y='.043'
					colorInterpolationFilters='sRGB'
					filterUnits='userSpaceOnUse'>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
					/>
					<feGaussianBlur
						in='BackgroundImageFix'
						stdDeviation='1.745'
					/>
					<feComposite
						in2='SourceAlpha'
						operator='in'
						result='effect1_backgroundBlur_78_1623'
					/>
					<feColorMatrix
						in='SourceAlpha'
						result='hardAlpha'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
					/>
					<feOffset dy='3.489' />
					<feGaussianBlur stdDeviation='8.723' />
					<feComposite
						in2='hardAlpha'
						operator='out'
					/>
					<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0' />
					<feBlend
						in2='effect1_backgroundBlur_78_1623'
						result='effect2_dropShadow_78_1623'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect2_dropShadow_78_1623'
						result='shape'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default FilePlusIcon;
