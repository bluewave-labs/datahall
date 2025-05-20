export { authService } from './auth/authService';
export type { StorageProvider, FileMetadata, UploadResult } from './storage/storageService';
export { uploadFile, deleteFile } from './storage/storageService';

// Fix the storageService import to use the correct path
// export {storageService} from './storage/storageService';

export { DocumentService } from './documentService';
export { createErrorResponse } from './errorService';
export { LinkService } from './linkService';
export { emailService } from './email/emailService';
