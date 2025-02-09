import { Typography, TypographyProps } from '@mui/material';
import NextLink from 'next/link';

interface NavLinkProps extends TypographyProps {
	href: string;
	linkText: string;
	color?: string;
	prefetch?: boolean;
}

const NavLink = ({
	href,
	linkText,
	color = 'text.brand',
	prefetch = false,
	...props
}: NavLinkProps) => {
	return (
		<Typography
			display='flex'
			zIndex={1}
			alignItems='center'
			component={'span'}
			{...props}>
			<NextLink
				href={href}
				prefetch={prefetch}
				passHref
				style={{
					textDecoration: 'none',
					color: 'inherit !important',
				}}>
				<Typography
					component={'span'}
					color={color}
					sx={{
						'&:hover': {
							textDecoration: 'underline',
						},
					}}>
					{linkText}
				</Typography>
			</NextLink>
		</Typography>
	);
};

export default NavLink;
