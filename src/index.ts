// Usage example
import * as fs from 'fs';
import * as path from 'path';
import { StorageFactory } from './StorageFactory';
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
  // upload
  const resp1 = await cloudinaryProvider.upload(fileBuffer, 'example.png', {});
  const resp2 = await cloudinaryProvider.download('example.png', {});
  const resp3 = await cloudinaryProvider.list({});
  const resp4 = await cloudinaryProvider.delete('example.png', {});
  const resp5 = await cloudinaryProvider.getUrl('gccyckcnbpcy5vx8gjyd', {});
  console.log(resp3)


  // upload file
  const respa = await s3Provider.upload(fileBuffer, 'examplex.png', {ContentType: 'image/png'} );
  // donwload file
  const respb = await s3Provider.download("examplex.png", {})
  // delete object
  const respc = await s3Provider.delete('examplex.png',{})
  // list objects
  const respd = await s3Provider.list({MaxKeys:5, ContinuationToken: '1b4ViI+EYgDvXxdaK30ya/sI81DnWHqe4pBcOXa8pNjWLMCw2wiSqcK6bqEH3vefogpbpYtsCYrjMRUtI7VvQ7jWA2iEMZTkttlr2/OZv0Ok='})
  // get single object
  const respE = s3Provider.getUrl('examplex.png', {expiresIn: 60 * 1})

  // console.log(resp3)
})();