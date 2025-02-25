import { FileType } from '@/shared/config/fileIcons';
import { LinkDetail } from './linkModels';

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

// ====== CHART TYPE ======

export interface BarDataItem {
	month: string;
	Views: number;
	Downloads: number;
	date: Date;
}
