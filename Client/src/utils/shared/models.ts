// Client/src/utils/shared/models.ts

// =========== ENUMS & CONFIGS ===========
export const FileTypeConfig = {
	'application/pdf': '/assets/icons/documentPage/pdf-icon.svg',
	'application/msword': '/assets/icons/documentPage/word-icon.svg',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
		'/assets/icons/documentPage/word-icon.svg',
	'application/vnd.ms-excel': '/assets/icons/documentPage/xlsx-icon.svg',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
		'/assets/icons/documentPage/xlsx-icon.svg',
	'application/vnd.ms-powerpoint': '/assets/icons/documentPage/ppt-icon.svg',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation':
		'/assets/icons/documentPage/ppt-icon.svg',
	'application/zip': '/assets/icons/documentPage/zip-icon.svg',
	'text/plain': '/assets/icons/documentPage/txt-icon.svg',
	'image/png': '/assets/icons/documentPage/image-icon.svg',
	'image/jpeg': '/assets/icons/documentPage/image-icon.svg',
	'image/gif': '/assets/icons/documentPage/image-icon.svg',
	'audio/mpeg': '/assets/icons/documentPage/audio-icon.svg',
	'audio/wav': '/assets/icons/documentPage/audio-icon.svg',
	'video/mp4': '/assets/icons/documentPage/video-icon.svg',
	'video/x-msvideo': '/assets/icons/documentPage/video-icon.svg',
	General: '/assets/icons/documentPage/general-icon.svg',
} as const;

export type FileType = keyof typeof FileTypeConfig;

// =========== DOCUMENT TYPE ===========

export interface DocumentType {
	document_id: string; // The unique DB identifier (cuid)
	fileName: string;
	filePath: string;
	fileType: FileType;
	size: number;
	createdAt: string; // ISO string
	updatedAt: string; // ISO string
	uploader: {
		name: string;
		avatar: string | null;
	};
	links: number; // The count of Link[]
	viewers: number; // The sum of all LinkVisitors for all links
	views: number; // Potential total doc views (0 if not tracked)
	createdLinks?: LinkDetail[]; // If you want to store link details
}

// =========== USER TYPE ===========
export interface User {
	user_id: number;
	name: string;
	email: string;
	role: 'Administrator' | 'Member';
	createdAt: string;
	// ... etc
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

// =========== VISITOR DETAIL ===========

export interface Contact {
	id: number;
	name: string; // Combined first + last name
	email: string; // If LinkVisitors has an email field
	document_id: string; // The document_id from DB
	lastActivity: Date; //The date/time of their last activity
	lastViewedLink: string; //The last link or friendly name they viewed
	totalVisits: number; //Total visits for that email across the user's links
	downloads: number;
	duration: string;
	completion: string;
}

// =========== LINK TYPE ===========

export interface LinkFormValues {
	password: string;
	isPublic: boolean;
	otherEmails: string;
	friendlyName: string;
	expirationTime: string;
	requirePassword: boolean;
	expirationEnabled: boolean;
	requireUserDetails: boolean;
	requiredUserDetailsOption: number;
}

// ====== Chart Type ======
export interface BarDataItem {
	month: string;
	Views: number;
	Downloads: number;
	date: Date;
}
