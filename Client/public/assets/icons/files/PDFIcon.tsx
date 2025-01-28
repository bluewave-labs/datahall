import React, { FC, SVGProps } from 'react';

interface PDFIconProps extends SVGProps<SVGSVGElement> {
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

const PDFIcon: FC<PDFIconProps> = ({
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
			aria-label='PDF Icon'
			role='img'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M3.64711 0.666504C2.06758 0.666504 0.787109 1.94697 0.787109 3.5265V21.6398C0.787109 23.2194 2.06758 24.4998 3.64711 24.4998H21.7604C23.34 24.4998 24.6204 23.2194 24.6204 21.6398V3.5265C24.6204 1.94697 23.34 0.666504 21.7604 0.666504H3.64711ZM5.16659 15.7013C5.26335 15.7675 5.42362 15.8007 5.64738 15.8007C5.87115 15.8007 6.03142 15.7675 6.12817 15.7013C6.22494 15.635 6.28542 15.5507 6.30961 15.4483C6.3338 15.3399 6.3459 15.2285 6.3459 15.1141V13.9305H7.50706C7.76106 13.9305 8.01809 13.8854 8.27814 13.795C8.53819 13.6987 8.77708 13.5601 8.9948 13.3794C9.21856 13.1927 9.39697 12.9608 9.53002 12.6838C9.66912 12.4067 9.73867 12.0845 9.73867 11.7171C9.73867 11.3437 9.66912 11.0184 9.53002 10.7414C9.39697 10.4643 9.21856 10.2324 8.9948 10.0457C8.77708 9.85299 8.53819 9.71145 8.27814 9.62111C8.02414 9.53076 7.77013 9.48559 7.51613 9.48559H5.65645C5.43269 9.48559 5.27242 9.51872 5.17566 9.58497C5.0789 9.65122 5.01842 9.73855 4.99423 9.84697C4.97004 9.94936 4.95794 10.0578 4.95794 10.1722V15.105C4.95794 15.2195 4.97004 15.3309 4.99423 15.4393C5.01842 15.5477 5.07587 15.635 5.16659 15.7013ZM7.51613 12.5573H6.3459V10.8588H7.50706C7.6764 10.8588 7.82456 10.895 7.95157 10.9672C8.08461 11.0395 8.18743 11.1389 8.26 11.2654C8.33258 11.3919 8.36886 11.5394 8.36886 11.7081C8.36886 11.9068 8.3235 12.0694 8.23279 12.1959C8.14812 12.3224 8.03926 12.4158 7.90621 12.476C7.7792 12.5302 7.64918 12.5573 7.51613 12.5573ZM10.5431 15.7013C10.6399 15.7675 10.7941 15.8007 11.0058 15.8007H12.6205C13.0681 15.8007 13.4793 15.7194 13.8543 15.5567C14.2353 15.3941 14.5679 15.1713 14.8521 14.8882C15.1364 14.5991 15.3571 14.2618 15.5144 13.8763C15.6716 13.4848 15.7502 13.0632 15.7502 12.6115C15.7502 12.1658 15.6716 11.7532 15.5144 11.3738C15.3571 10.9943 15.1364 10.6631 14.8521 10.38C14.5679 10.0969 14.2383 9.87708 13.8633 9.72049C13.4884 9.56389 13.0832 9.48559 12.6477 9.48559H11.0149C10.7911 9.47956 10.6308 9.50968 10.5341 9.57594C10.4373 9.64219 10.3768 9.72952 10.3526 9.83794C10.3284 9.94032 10.3163 10.0487 10.3163 10.1632V15.105C10.3163 15.2255 10.3315 15.3399 10.3617 15.4483C10.3919 15.5507 10.4524 15.635 10.5431 15.7013ZM12.6477 14.4184H11.6952V10.8588H12.6387C12.9713 10.8588 13.2676 10.9371 13.5277 11.0937C13.7877 11.2443 13.9934 11.4551 14.1446 11.7261C14.2958 11.9972 14.3714 12.3043 14.3714 12.6476C14.3714 12.991 14.2958 13.2951 14.1446 13.5601C13.9934 13.8251 13.7877 14.0359 13.5277 14.1925C13.2676 14.3431 12.9743 14.4184 12.6477 14.4184ZM16.6754 15.7103C16.7722 15.7706 16.9294 15.8007 17.1471 15.8007C17.3769 15.8007 17.5372 15.7706 17.6279 15.7103C17.7247 15.6441 17.7852 15.5598 17.8094 15.4574C17.8335 15.349 17.8456 15.2375 17.8456 15.1231V13.2168H19.6962C19.8232 13.2168 19.9321 13.2078 20.0228 13.1897C20.1196 13.1716 20.1952 13.1235 20.2496 13.0452C20.304 12.9608 20.3313 12.8223 20.3313 12.6296C20.3313 12.4308 20.304 12.2893 20.2496 12.205C20.1952 12.1206 20.1196 12.0694 20.0228 12.0514C19.9321 12.0333 19.8263 12.0243 19.7053 12.0243H17.8456V10.8588H19.6319C19.7529 10.8588 19.8648 10.8498 19.9676 10.8317C20.0764 10.8076 20.1641 10.7474 20.2307 10.651C20.2972 10.5547 20.3304 10.3981 20.3304 10.1812C20.3304 9.95237 20.2972 9.78975 20.2307 9.69339C20.1702 9.59701 20.0885 9.53979 19.9857 9.52173C19.8829 9.49764 19.771 9.48559 19.6501 9.48559H17.1743C16.9082 9.48559 16.7238 9.53377 16.621 9.63014C16.5182 9.72651 16.4668 9.9072 16.4668 10.1722V15.1141C16.4668 15.2285 16.4758 15.3399 16.494 15.4483C16.5182 15.5567 16.5786 15.6441 16.6754 15.7103Z'
				fill='#EA3434'
			/>
		</svg>
	);
};

export default PDFIcon;
