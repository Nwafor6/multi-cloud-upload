import { S3 } from 'aws-sdk';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { StorageProvider } from './StorageProvider';

export class S3Provider implements StorageProvider {
  private s3: S3;
  private bucket: string;

  constructor(config: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  }) {
    this.s3 = new S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
    });
    this.bucket = config.bucket;
  }

  async upload(file: Buffer, fileName: string, context:object={}): Promise<string> {
    await this.s3.putObject({
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
      ...context
    }).promise();
    console.log(fileName, "dsfsdfsdvb")
    return fileName;
  }

  async download(fileName: string, context:object={}): Promise<Buffer> {
    const result = await this.s3.getObject({
      Bucket: this.bucket,
      Key: fileName,
      ...context
    }).promise();
    console.log(result, "download result")
    return result.Body as Buffer;
  }

  async delete(fileName: string, context:object={}): Promise<void> {
    await this.s3.deleteObject({
      Bucket: this.bucket,
      Key: fileName,
      ...context
    }).promise();
  }

  async list(): Promise<string[]> {
    const result = await this.s3.listObjectsV2({
      Bucket: this.bucket,
    }).promise();
    console.log(result, "list result")
    return result.Contents?.map(object => object.Key as string) || [];
  }

  getUrl(fileName: string, context:object={}): string {
    const result= this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: fileName,
      ...context,
      // Expires: 60 * 5, // URL expires in 5 minutes
    });
    console.log(result, "get url only");
    return result;
  }
}