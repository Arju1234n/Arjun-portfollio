import { v2 as cloudinaryV2 } from 'cloudinary';
import streamifier from 'streamifier';
import { env } from './env';
import type { CloudinaryUploadResult } from '../types';

/** Configure Cloudinary SDK with credentials from env */
cloudinaryV2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinaryV2 };

/**
 * Uploads a Buffer to Cloudinary using a readable stream (avoids temp files).
 *
 * @param buffer   - File buffer (from multer memoryStorage)
 * @param folder   - Destination folder in Cloudinary
 * @param options  - Additional Cloudinary upload options
 * @returns        - Cloudinary upload result
 */
export function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  options: Record<string, unknown> = {},
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
          return;
        }
        if (!result) {
          reject(new Error('Cloudinary upload returned no result'));
          return;
        }
        resolve(result as unknown as CloudinaryUploadResult);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

/**
 * Deletes a resource from Cloudinary by its public_id.
 *
 * @param publicId     - Cloudinary public ID
 * @param resourceType - 'image' | 'video' | 'raw' (default: 'image')
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image',
): Promise<void> {
  await cloudinaryV2.uploader.destroy(publicId, { resource_type: resourceType });
}
