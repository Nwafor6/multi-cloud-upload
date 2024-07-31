import { S3Client, S3ClientConfig, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { StorageProvider } from './StorageProvider';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Provider implements StorageProvider {
  private s3: S3Client;
  private bucket: string;

  constructor(config: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  }) {
    const s3Config: S3ClientConfig = {
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region,
    };
    this.s3 = new S3Client({ ...s3Config });
    this.bucket = config.bucket;
  }

  /**
   * Uploads a file to the storage provider.
   * @param file - The file data as a Buffer.
   * @param fileName - The name of the file to be uploaded.
   * @param context - Additional context or metadata related to the upload.
   * @returns A Promise that resolves to the file name of the uploaded file.
   * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/}
   */
  async upload(file: Buffer, fileName: string, context: object = {}): Promise<any> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(fileName, data, "upload result");
    return fileName;
  }

  /**
   * Downloads a file from the storage provider.
   * @param fileName - The name of the file to download.
   * @param context - Additional context or metadata related to the download.
   * @returns A Promise that resolves to the file data. The data will be a readable stream for S3.
   * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectCommand/}
   */
  async download(fileName: string, context: object = {}): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(data.Body, "download result");
    return data;
  }

  /**
   * Deletes a file from the storage provider.
   * @param fileName - The name of the file to delete.
   * @param context - Additional context or metadata related to the deletion.
   * @returns A Promise that resolves to the response data from the delete operation.
   * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/DeleteObjectCommand/}
   */
  async delete(fileName: string, context: object = {}): Promise<any> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(data, "delete result");
    return data;
  }

  /**
   * Lists all files in the storage provider's bucket.
   * @param context - Additional context or metadata related to the list operation.
   * @returns A Promise that resolves to an array of file names.
   * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsV2Command/}
   */
  async list(context: object = {}): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(data, "list result");
    return data.Contents?.map(object => object.Key as string) || [];
  }

  /**
   * Generates a pre-signed URL for accessing a file.
   * @param fileName - The name of the file for which to generate the URL.
   * @param context - Additional context or metadata related to the URL generation. Can include an expiration time (`expiresIn`).
   * @returns A Promise that resolves to the pre-signed URL.
   * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3-request-presigner/getSignedUrl.html}
   */
  async getUrl(fileName: string, context: { expiresIn?: number } = {}): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ...context,
    });
    const expiresIn = context.expiresIn || 60 * 5; // Default to 5 minutes
    try {
      // Generate a pre-signed URL with the specified expiration time
      const url = await getSignedUrl(this.s3, command, { expiresIn });
      console.log(url, "get url only");
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
