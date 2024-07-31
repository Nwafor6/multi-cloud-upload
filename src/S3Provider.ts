
import { S3Client, S3ClientConfig, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
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
        accessKeyId:  config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region, 
    };
    this.s3 = new S3Client({ ...s3Config });
    this.bucket = config.bucket;
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/ for adddtional context you may need.
  async upload(file: Buffer, fileName: string, context:object={}): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(fileName, data, "dsfsdfsdvb")
    return fileName;
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectCommand/
  async download(fileName: string, context:object={}): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(data.Body, "download result")
    return data;
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/DeleteObjectCommand/
  async delete(fileName: string, context:object={}): Promise<any> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ...context
    });
    const data = await this.s3.send(command);
    console.log(data, "download result")
    return data
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsV2Command/
  async list(context:object={}): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      ...context
    })
    const data = await this.s3.send(command);
    console.log(data, "listed result")
    return data.Contents?.map(object => object.Key as string) || [];
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectCommand/
  async getUrl(fileName: string, context:{ expiresIn?: number }={}): Promise<any> {
    
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      ...context,
    });
    const expiresIn = context.expiresIn || 60 * 5; // Default to 5 minutes
    try {
      // Generate a pre-signed URL with an expiration time of 5 minutes
      const url = await getSignedUrl(this.s3, command, { expiresIn });
      console.log(url, "get url only");
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}