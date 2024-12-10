import { StorageProvider, FileMetadata, UploadResult } from '@/services/storageService';
import { createClient } from '@supabase/supabase-js';

export class SupabaseProvider implements StorageProvider {
	private supabase;

	constructor() {
		this.supabase = createClient(
			process.env.SUPABASE_URL as string,
			process.env.SUPABASE_SERVICE_ROLE_KEY as string,
		);
	}

	/**
	 * Uploads a file to the Supabase storage bucket.
	 * @param fileBuffer - Buffer containing the file's data.
	 * @param metadata - Metadata for the upload (userId, fileName, fileType).
	 * @returns A promise resolving to the file's public URL (if bucket is public) or file path (if bucket is private).
	 */
	async upload(fileBuffer: Buffer, metadata: FileMetadata): Promise<UploadResult> {
		const bucketName = 'documents';
		const filePath = `${metadata.userId}/${metadata.fileName}`;

		// Upload file to Supabase Storage
		const { error } = await this.supabase.storage.from(bucketName).upload(filePath, fileBuffer, {
			contentType: metadata.fileType,
			upsert: true, // Overwrites if file exists
		});

		if (error) {
			console.error('Supabase upload error:', error);
			throw new Error('File upload failed.');
		}

		// Return the file path (to be stored in the database)
		return { filePath: filePath };
	}

	/**
	 * Deletes a file from the Supabase storage bucket.
	 * @param filePath - The path of the file to delete within the bucket.
	 */
	async delete(filePath: string): Promise<void> {
		const bucketName = 'documents';

		const { error } = await this.supabase.storage.from(bucketName).remove([filePath]);

		if (error) {
			console.error('Supabase delete error:', error);
			throw new Error('File deletion failed.');
		}
	}
}