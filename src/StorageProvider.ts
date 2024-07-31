export interface StorageProvider {
  /**
   * Uploads a file to the storage provider.
   * @param file - The file to upload, as a Buffer.
   * @param fileName - The name to give the uploaded file.
   * @param context - Additional context or metadata related to the upload.
   * @returns A Promise that resolves to the URL or identifier of the uploaded file.
   */
  upload(file: Buffer, fileName: string, context: object): Promise<string>;

  /**
   * Downloads a file from the storage provider.
   * @param fileName - The name of the file to download.
   * @param context - Additional context or metadata related to the download.
   * @returns A Promise that resolves to the file data, which could be a Buffer or a ReadableStream.
   */
  download(fileName: string, context: object): Promise<Buffer | ReadableStream<any>>;

  /**
   * Deletes a file from the storage provider.
   * @param fileName - The name of the file to delete.
   * @param context - Additional context or metadata related to the delete operation.
   * @returns A Promise that resolves when the delete operation is complete.
   */
  delete(fileName: string, context: object): Promise<any>;

  /**
   * Lists the files available in the storage provider.
   * @returns A Promise that resolves to an array of file names.
   */
  list(context: object): Promise<string[]>;

  /**
   * Gets the URL or identifier of a file in the storage provider.
   * @param fileName - The name of the file.
   * @param context - Additional context or metadata related to the file.
   * @returns The URL or identifier of the file.
   */
  getUrl(fileName: string, context: object): Promise<any>;
}
