// =========== LINK TYPE ===========

export interface LinkType {
	id: number;
	linkId: string;
	documentId: string;
	userId: string;
	alias?: string;
	linkUrl: string;
	isPublic: boolean;
	visitorFields?: string[];
	expirationTime?: string;
	password?: string;
	updatedAt: string;
	createdAt: string;
}

// =========== LINK FORM VALUES ===========

export interface LinkFormValues {
	password?: string;
	isPublic: boolean;
	alias?: string;
	expirationTime?: string;
	requirePassword: boolean;
	expirationEnabled: boolean;
	requireUserDetails: boolean;
	visitorFields?: string[];
	contactEmails?: { label: string; id: number }[];
	selectFromContact: boolean;
	otherEmails?: string;
	sendToOthers: boolean;
}

// =========== LINK PAYLOAD ===========

export interface CreateDocumentLinkPayload {
	documentId: string;
	alias?: string; // Alias for the link
	isPublic: boolean;
	expirationTime?: string; // ISO string format
	expirationEnabled?: boolean;
	requirePassword?: boolean;
	password?: string;
	requireUserDetails?: boolean;
	visitorFields?: string[]; // Array of required visitor details
	contactEmails?: { label: string; id: number }[];
	selectFromContact: boolean;
	otherEmails?: string;
	sendToOthers: boolean;
}

// =========== INVITE RECIPIENTS PAYLOAD ===========

export interface InviteRecipientsPayload {
	linkUrl: string;
	recipients: string[];
}

// =========== LINK DATA ===========

export interface LinkData {
	isPasswordProtected?: boolean;
	requiredUserDetailsOption?: number;
	signedUrl?: string;
	fileName?: string;
	size?: number;
	fileType?: string;
	documentId?: string;
}

// =========== LINK DETAIL ===========

export interface LinkDetail {
	documentLinkId: string; // unique string
	alias: string; // The links's friendly name
	document_id: string; // The document_id from DB
	createdLink: string; // The linkUrl from DB
	lastActivity: Date; // The link's updatedAt
	linkViews: number; // If you track actual link views, you can use a real value
}
