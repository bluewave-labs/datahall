// Client/src/utils/shared/models.ts

import {
	PDFIcon,
	WordIcon,
	ExcelIcon,
	PPTIcon,
	ZIPIcon,
	TextIcon,
	ImageIcon,
	AudioIcon,
	VideoIcon,
	GeneralIcon,
} from '../../../public/assets/icons';

// =========== ENUMS & CONFIGS ===========
export const FileTypeConfig = {
	'application/pdf': PDFIcon,
	'application/msword': WordIcon,
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': WordIcon,
	'application/vnd.ms-excel': ExcelIcon,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ExcelIcon,
	'application/vnd.ms-powerpoint': PPTIcon,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': PPTIcon,
	'application/zip': ZIPIcon,
	'text/plain': TextIcon,
	'image/png': ImageIcon,
	'image/jpeg': ImageIcon,
	'image/gif': ImageIcon,
	'audio/mpeg': AudioIcon,
	'audio/wav': AudioIcon,
	'video/mp4': VideoIcon,
	'video/x-msvideo': VideoIcon,
	General: GeneralIcon,
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

// ====== Chart Type ======
export interface BarDataItem {
	month: string;
	Views: number;
	Downloads: number;
	date: Date;
}
