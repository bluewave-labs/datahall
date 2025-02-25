// =========== LINK TYPE ===========

export interface LinkFormValues {
	password?: string;
	isPublic: boolean;
	otherEmails: string;
	friendlyName?: string;
	expirationTime?: string;
	requirePassword: boolean;
	expirationEnabled: boolean;
	requireUserDetails: boolean;
	requiredUserDetailsOption: number;
}

// =========== LINK DETAIL ===========

export interface LinkDetail {
	linkId: string; // unique string
	friendlyName: string; // The links's friendly name
	document_id: string; // The document_id from DB
	createdLink: string; // The linkUrl from DB
	lastActivity: Date; // The link's updatedAt
	linkViews: number; // If you track actual link views, you can use a real value
}

// =========== LINK DATA ===========

export interface LinkData {
	isPasswordProtected?: boolean;
	requiredUserDetailsOption?: number;
	signedUrl?: string;
	fileName?: string;
	size?: number;
}
