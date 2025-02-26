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
} from '@/icons';

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
