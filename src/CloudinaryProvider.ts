import { v2 as cloudinary } from 'cloudinary';
import { StorageProvider } from './StorageProvider';

export class CloudinaryProvider implements StorageProvider {
  constructor(config: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  }) {
    cloudinary.config(config);
  }

  /**
   * Uploads a file to Cloudinary.
   * @param file - The file data as a Buffer.
   * @param fileName - The name to assign to the uploaded file.
   * @param context - Additional context or metadata related to the upload.
   * @returns A Promise that resolves to the public ID of the uploaded file.
   */
  async upload(file: Buffer, fileName: string, context: object = {}): Promise<any> {
    try {
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${file.toString('base64')}`, {
        public_id: fileName,
        ...context
      });
      return result;
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  /**
   * Downloads a file from Cloudinary.
   * @param fileName - The name of the file to download.
   * @param context - Additional context or metadata related to the download.
   * @returns A Promise that resolves to the file data as a Buffer.
   */
  async download(fileName: string, context: object = {}): Promise<any> {
    try {
      const result = await cloudinary.api.resource(fileName, {...context});
      return result
    } catch (error) {
      console.error('Error downloading file from Cloudinary:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  /**
   * Deletes a file from Cloudinary.
   * @param fileName - The name of the file to delete.
   * @param context - Additional context or metadata related to the deletion.
   * @returns A Promise that resolves when the delete operation completes.
   */
  async delete(fileName: string, context: object = {}): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(fileName);
      return result;
    } catch (error) {
      console.error('Error deleting file from Cloudinary:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  /**
   * Lists all files in Cloudinary.
   * @returns A Promise that resolves to an array of public IDs of the listed files.
   */
  async list(context: object = {}): Promise<string[]> {
    try {
      const result = await cloudinary.api.resources();
      // result.resources.map((resource: any) => resource.public_id);
      return result;
    } catch (error) {
      console.error('Error listing files from Cloudinary:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  /**
   * Generates a URL for accessing a file in Cloudinary.
   * @param fileName - The name of the file for which to generate the URL.
   * @param context - Additional context or parameters related to the URL generation.
   * @returns A Promise that resolves to the URL of the file.
   */
  getUrl(fileName: string, context: object = {}): Promise<string> {
    try {
      return Promise.resolve(cloudinary.url(fileName, { ...context }));
    } catch (error) {
      console.error('Error generating URL from Cloudinary:', error);
      return Promise.reject(error); // Return a rejected promise if an error occurs
    }
  }
}
