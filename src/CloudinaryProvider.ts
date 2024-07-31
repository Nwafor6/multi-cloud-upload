import { v2 as cloudinary } from 'cloudinary';
import { StorageProvider } from './StorageProvider';

// export class CloudinaryProvider implements StorageProvider {
//   constructor(config: {
//     cloud_name: string;
//     api_key: string;
//     api_secret: string;
//   }) {
//     cloudinary.config(config);
//   }

//   async upload(file: Buffer, fileName: string, context:object={}): Promise<string> {
//     const result = await cloudinary.uploader.upload(`data:image/png;base64,${file.toString('base64')}`, {
//       public_id: fileName,
//     });
//     return result.public_id;
//   }

//   async download(fileName: string, context:object={}): Promise<Buffer> {
//     const result = await cloudinary.api.resource(fileName);
//     const response = await fetch(result.url);
//     return Buffer.from(await response.arrayBuffer());
//   }

//   async delete(fileName: string, context:object={}): Promise<void> {
//     await cloudinary.uploader.destroy(fileName);
//   }

//   async list(): Promise<string[]> {
//     const result = await cloudinary.api.resources();
//     return result.resources.map((resource: any) => resource.public_id);
//   }

//   getUrl(fileName: string, context:object={}): string {
//     return cloudinary.url(fileName);
//   }
// }