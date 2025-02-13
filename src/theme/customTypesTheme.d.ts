import '@mui/material/styles';

declare module '@mui/material' {
	interface Palette {
		border: {
			light: string;
			dark: string;
		};
	}

	interface SimplePaletteColorOptions {
		text?: string;
	}

	interface PaletteOptions {
		border?: {
			light: string;
			dark: string;
		};
	}

	interface ThemeOptions {
		shape?: {
			borderRadius: number;
			borderThick?: number;
			boxShadow?: string;
		};
		customShadows?: {
			menu?: string;
		};
	}
}

declare module '@mui/material/styles' {
	interface TypeBackground {
		content: string;
		alt: string;
		brand: string;
		fill: string;
		error: string;
	}

	interface Theme {
		customShadows: {
			menu: string;
		};
	}

	// Extend the Variant type
	interface TypographyVariants {
		subtitle3: React.CSSProperties;
	}

	// Extend the Variant type for theme options
	interface TypographyVariantsOptions {
		subtitle3?: React.CSSProperties;
	}
}

// For components using Typography
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		subtitle3: true;
	}
}
