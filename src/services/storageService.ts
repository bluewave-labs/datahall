// storageService.ts
import { SupabaseProvider } from '@/providers/storage/supabase/supabaseProvider';

/**
 * Metadata for a file upload.
 * Describes additional information passed during file upload.
 */
export type FileMetadata = {
	fileName: string; // Name of the file
	userId: string; // User ID of the uploader
	fileType: string; // MIME type of the file
};

/**
 * Result of a file upload operation.
 * Represents the URL of the uploaded file.
 */
export type UploadResult = {
	filePath: string; // Public URL of the uploaded file
};

/**
 * Interface for storage providers.
 * Abstracts upload and delete operations for flexibility.
 */
export interface StorageProvider {
	/**
	 * Uploads a file to the storage provider.
	 * @param fileBuffer - Buffer of the file to upload
	 * @param metadata - Metadata for the upload
	 * @returns A promise resolving to the public URL of the uploaded file
	 */
	upload(fileBuffer: Buffer, metadata: FileMetadata): Promise<UploadResult>;

	/**
	 * Deletes a file from the storage provider.
	 * @param filePath - The path of the file to delete
	 * @returns A promise resolving when the file is deleted
	 */
	delete(filePath: string): Promise<void>;
}

export class PlaceholderProvider implements StorageProvider {
	async upload(fileBuffer: Buffer, metadata: FileMetadata): Promise<UploadResult> {
		console.warn('PlaceholderProvider: Upload called.');
		return { filePath: 'https://example.com/placeholder-url' }; // Placeholder URL
	}

	async delete(filePath: string): Promise<void> {
		console.warn('PlaceholderProvider: Delete called.');
	}
}

/**
 * Determines the storage provider based on the STORAGE_PROVIDER environment variable.
 * @returns {StorageProvider} - An instance of the selected storage provider.
 */
function selectStorageProvider(): StorageProvider {
	const provider = process.env.STORAGE_PROVIDER;

	switch (provider) {
		case 'supabase':
			return new SupabaseProvider();
		// case 'local':
		//   // PlaceholderProvider can be replaced with an actual LocalProvider later
		//   return new PlaceholderProvider();
		default:
			throw new Error(`Unsupported storage provider specified in STORAGE_PROVIDER: ${provider}`);
	}
}

// Initialize the storage provider based on the environment variable
const storageProvider: StorageProvider = selectStorageProvider();

/**
 * Uploads a file using the configured storage provider.
 * @param {Buffer} fileBuffer - Buffer of the file to upload.
 * @param {FileMetadata} metadata - Metadata for the file upload.
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */
export async function uploadFile(fileBuffer: Buffer, metadata: FileMetadata): Promise<string> {
	try {
		const result = await storageProvider.upload(fileBuffer, metadata);
		return result.filePath;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw new Error('File upload failed.');
	}
}

/**
 * Deletes a file using the configured storage provider.
 * @param {string} filePath - The path of the file to delete.
 * @returns {Promise<void>} - Resolves when the file is deleted.
 */
export async function deleteFile(filePath: string): Promise<void> {
	try {
		await storageProvider.delete(filePath);
	} catch (error) {
		console.error('Error deleting file:', error);
		throw new Error('File deletion failed.');
	}
}
