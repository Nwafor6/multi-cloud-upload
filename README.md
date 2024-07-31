
---

# Multi-Cloud Uploader

A Node.js package that provides an easy interface to upload and manage files on both Cloudinary and AWS S3. This package supports both JavaScript and TypeScript projects, making it versatile and easy to integrate into various environments.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [JavaScript](#javascript)
  - [TypeScript](#typescript)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [StorageProvider](#fileuploader)
  - [CloudinaryUploader](#cloudinaryuploader)
  - [S3Uploader](#s3uploader)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the package, use npm or yarn:

```bash
npm install multi-cloud-uploader
```

or

```bash
yarn add multi-cloud-uploader
```

## Features

- **Supports Cloudinary and AWS S3**: Easily switch between Cloudinary and AWS S3 for file uploads and management.
- **Compatible with JavaScript and TypeScript**: Includes type definitions for TypeScript support.
- **Simple and Extensible**: Easy-to-use interface that can be extended to support additional cloud services.

## Usage

### JavaScript

```javascript

const StorageFactory = require('multi-cloud-uploader/StorageFactory');
require("dotenv").config();

// Load configurations from environment variables
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
const region = process.env.AWS_REGION || '';
const bucket = process.env.AWS_BUCKET || '';

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
};


const s3Config = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  bucket: bucket,

};

const cloudinaryProvider = StorageFactory.createProvider('cloudinary', cloudinaryConfig);
const s3Provider = StorageFactory.createProvider('s3', s3Config);


// Read the actual image file into a buffer
const filePath = path.join(__dirname, 'test.png');
const fileBuffer = fs.readFileSync(filePath);

console.log(fileBuffer, "sdfnjbfdvbfd");

// Now you can use either provider with the same interface
(async () => {
  let context = {}
  // upload
  const resp1 = await cloudinaryProvider.upload(fileBuffer, 'example.png', context);
  const resp2 = await cloudinaryProvider.download('example.png', context);
  const resp3 = await cloudinaryProvider.list(context);
  const resp4 = await cloudinaryProvider.delete('example.png', context);
  const resp5 = await cloudinaryProvider.getUrl('gccyckcnbpcy5vx8gjyd', context);
  console.log(resp3)


  // upload file
  const respa = await s3Provider.upload(fileBuffer, 'examplex.png', {ContentType: 'image/png'} );
  // donwload file
  const respb = await s3Provider.download("examplex.png", context)
  // delete object
  const respc = await s3Provider.delete('examplex.png',context)
  // list objects
  context = {MaxKeys:5, ContinuationToken: 'xyz'}
  const respd = await s3Provider.list(context)
  // get single object
  context = {expiresIn: 60 * 1}
  const respE = s3Provider.getUrl('examplex.png', context)

  // console.log(resp3)
})()


// Cloudinary usage
const cloudinaryUploader = new CloudinaryUploader();
const uploader = new FileUploader(cloudinaryUploader);

uploader.upload(buffer, options)
  .then(url => console.log('Uploaded to Cloudinary:', url))
  .catch(err => console.error('Error uploading to Cloudinary:', err));

// AWS S3 usage
const s3Uploader = new S3Uploader();
const uploader = new FileUploader(s3Uploader);

uploader.upload(buffer, options)
  .then(url => console.log('Uploaded to S3:', url))
  .catch(err => console.error('Error uploading to S3:', err));
```

### TypeScript

```typescript

// Usage example
import * as fs from 'fs';
import * as path from 'path';
import { StorageFactory } from 'multi-cloud-uploader/StorageFactory';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables


// Load configurations from environment variables
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
const region = process.env.AWS_REGION || '';
const bucket = process.env.AWS_BUCKET || '';

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
};


const s3Config = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  bucket: bucket,

};

const cloudinaryProvider = StorageFactory.createProvider('cloudinary', cloudinaryConfig);
const s3Provider = StorageFactory.createProvider('s3', s3Config);


// Read the actual image file into a buffer
const filePath = path.join(__dirname, 'test.png');
const fileBuffer = fs.readFileSync(filePath);

console.log(fileBuffer, "sdfnjbfdvbfd");

// Now you can use either provider with the same interface
(async () => {
  let context = {}
  // upload
  const resp1 = await cloudinaryProvider.upload(fileBuffer, 'example.png', context);
  const resp2 = await cloudinaryProvider.download('example.png', context);
  const resp3 = await cloudinaryProvider.list(context);
  const resp4 = await cloudinaryProvider.delete('example.png', context);
  const resp5 = await cloudinaryProvider.getUrl('gccyckcnbpcy5vx8gjyd', context);
  console.log(resp3)


  // upload file
  const respa = await s3Provider.upload(fileBuffer, 'examplex.png', {ContentType: 'image/png'} );
  // donwload file
  const respb = await s3Provider.download("examplex.png", context)
  // delete object
  const respc = await s3Provider.delete('examplex.png',context)
  // list objects
  const respd = await s3Provider.list({MaxKeys:5, ContinuationToken: 'xyz'})
  // get single object
  context = {expiresIn: 60 * 1}
  const respE = s3Provider.getUrl('examplex.png', context)

  // console.log(resp3)
})();
```

## Configuration

To use this package, you need to configure your credentials and options for Cloudinary or AWS S3 depending on your storage service of choice.

### Cloudinary

Set up your Cloudinary credentials:

```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
  // other parameters
});
```

### AWS S3

Set up your AWS credentials and region:

```javascript

const { S3Client } = require('@aws-sdk/client-s3');

const s3Config = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  bucket: bucket,
};
```

## API Reference

### StorageProvider

The `StorageProvider` class provides a common interface for uploading, downloading, listing, getUrl and deleting files.

#### `upload(file: Buffer, fileName: string, options?: any): Promise<any>`

- **file**: The file to be uploaded as a `Buffer`.
- **fileName**: The name to save the file under.
- **options**: Optional parameters for the upload.

#### `download(fileName: string, options?: any): Promise<any>`

- **fileName**: The name of the file to be downloaded.
- **options**: Optional parameters for the download.

#### `delete(fileName: string, options?: any): Promise<any>`

- **fileName**: The name of the file to be deleted.
- **options**: Optional parameters for the delete operation.

#### `list(options?: any): Promise<string[]>`

- **options**: Optional parameters for listing files.
- **Returns**: A Promise that resolves to an array of file names.

#### `getUrl(fileName: string, options?: { expiresIn?: number }): Promise<string>`

- **fileName**: The name of the file for which to generate the URL.
- **options**: Optional parameters, including expiration time (`expiresIn`).
- **Returns**: A Promise that resolves to the pre-signed URL.

### CloudinaryProvider

The `CloudinaryProvider` class implements the `StorageProvider` interface for Cloudinary.

#### `upload(file: Buffer, fileName: string, options?: any): Promise<any>`

Uploads a file to Cloudinary.

#### `download(fileName: string, options?: any): Promise<any>`

Downloads a file from Cloudinary.

#### `delete(fileName: string, options?: any): Promise<any>`

Deletes a file from Cloudinary.

#### `list(options?: any): Promise<string[]>`

Lists files from Cloudinary.

#### `getUrl(fileName: string, options?: { expiresIn?: number }): Promise<string>`

Generates a URL for accessing a file in Cloudinary.

### S3Provider

The `S3Provider` class implements the `StorageProvider` interface for AWS S3.

#### `upload(file: Buffer, fileName: string, options?: any): Promise<any>`

Uploads a file to an S3 bucket.

#### `download(fileName: string, options?: any): Promise<any>`

Downloads a file from an S3 bucket.

#### `delete(fileName: string, options?: any): Promise<any>`

Deletes a file from an S3 bucket.

#### `list(options?: any): Promise<string[]>`

Lists files from an S3 bucket.

#### `getUrl(fileName: string, options?: { expiresIn?: number }): Promise<string>`

Generates a pre-signed URL for accessing a file in an S3 bucket.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---