// src/StorageFactory.ts

import { StorageProvider } from './StorageProvider';
// import { CloudinaryProvider } from './CloudinaryProvider';
import { S3Provider } from './S3Provider';

type ProviderType = 'cloudinary' | 's3';

export class StorageFactory {
  static createProvider(type: ProviderType, config: any): StorageProvider {
    switch (type) {
      case 'cloudinary':
        throw new Error(`Unsupported provider type: ${type}`);
        // return new CloudinaryProvider(config);
      case 's3':
        return new S3Provider(config);
      default:
        throw new Error(`Unsupported provider type: ${type}`);
    }
  }
}