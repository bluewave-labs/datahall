import React, { FC, SVGProps } from 'react';

interface ZIPIconProps extends SVGProps<SVGSVGElement> {
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

const ZIPIcon: FC<ZIPIconProps> = ({
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
			aria-label='ZIP Icon'
			role='img'
			{...props}>
			<g clipPath='url(#clip0_1834_2783)'>
				<path
					d='M21.817.496h-6.31c.421 0 .702.28.702.701 0 .42-.28.701-.701.701h-1.402c-.42 0-.701-.28-.701-.7 0-.422.28-.702.7-.702H3.592A2.812 2.812 0 0 0 .787 3.3v18.226a2.812 2.812 0 0 0 2.804 2.803h18.226a2.812 2.812 0 0 0 2.803-2.803V3.3A2.812 2.812 0 0 0 21.817.496ZM9.9 1.898h1.402c.42 0 .7.28.7.701 0 .42-.28.701-.7.701H9.9c-.42 0-.701-.28-.701-.701 0-.42.28-.701.7-.701Zm0 2.804h1.402c.42 0 .7.28.7.701 0 .42-.28.7-.7.7H9.9c-.42 0-.701-.28-.701-.7 0-.42.28-.701.7-.701Zm0 2.804h1.402c.42 0 .7.28.7.7 0 .421-.28.702-.7.702H9.9c-.42 0-.701-.28-.701-.701 0-.42.28-.701.7-.701Zm6.309 7.01a2.812 2.812 0 0 1-2.804 2.804h-1.402a2.812 2.812 0 0 1-2.804-2.804V10.31h7.01v4.206Zm-.701-7.01h-1.402c-.42 0-.701-.28-.701-.701 0-.42.28-.701.7-.701h1.403c.42 0 .7.28.7.7 0 .422-.28.702-.7.702Zm0-2.804h-1.402c-.42 0-.701-.28-.701-.701 0-.42.28-.701.7-.701h1.403c.42 0 .7.28.7.701 0 .42-.28.701-.7.701Z'
					fill='#FF650F'
				/>
			</g>
			<defs>
				<clipPath id='clip0_1834_2783'>
					<path
						fill='white'
						transform='translate(.787 .496)'
						d='M0 0h23.833v23.833H0z'
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default ZIPIcon;
