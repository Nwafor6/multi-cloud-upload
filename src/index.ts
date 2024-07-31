// Usage example
import * as fs from 'fs';
import * as path from 'path';
import { StorageFactory } from './StorageFactory';


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
  // upload
  const resp1 = await cloudinaryProvider.upload(fileBuffer, 'example.png', {});
  const resp2 = await cloudinaryProvider.download('example.png', {});
  const resp3 = await cloudinaryProvider.list({});
  const resp5 = await cloudinaryProvider.delete('poflneqlsbw4jngxdlqe', {});
  const resp6 = await cloudinaryProvider.getUrl('gccyckcnbpcy5vx8gjyd', {});
  console.log(resp1)


  // upload file
  await s3Provider.upload(fileBuffer, 'example3.png', {ContentType: 'image/png'} );
  // donwload file
  await s3Provider.download("example1.png", {})
  // delete object
  await s3Provider.delete('example.png',{})
  // list objects
  await s3Provider.list({MaxKeys:5, ContinuationToken: '1b4ViI+EYgDvXxdaK30ya/sI81DnWHqe4pBcOXa8pNjWLMCw2wiSqcK6bqEH3vefogpbpYtsCYrjMRUtI7VvQ7jWA2iEMZTkttlr2/OZv0Ok='})
  // get single object
  s3Provider.getUrl('example1.png', {expiresIn: 60 * 1})
})();