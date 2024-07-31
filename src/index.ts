// Usage example
import * as fs from 'fs';
import * as path from 'path';
import { StorageFactory } from './StorageFactory';

const accessKeyId= "REMOVED"
const secretAccessKey= "REMOVED"
const region="eu-north-1"
const bucket = "REMOVED"

// const cloudinaryConfig = {
//   cloud_name: 'your_cloud_name',
//   api_key: 'your_api_key',
//   api_secret: 'your_api_secret',
// };

const s3Config = {
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  bucket: bucket,

};

// const cloudinaryProvider = StorageFactory.createProvider('cloudinary', cloudinaryConfig);
const s3Provider = StorageFactory.createProvider('s3', s3Config);

// // Define fileBuffer as a Buffer object or any other type that represents the file data
// const fileBuffer = Buffer.from('test.png');
// Read the actual image file into a buffer
const filePath = path.join(__dirname, 'test.png');
const fileBuffer = fs.readFileSync(filePath);

console.log(fileBuffer, "sdfnjbfdvbfd");

// Now you can use either provider with the same interface
(async () => {
  // await cloudinaryProvider.upload(fileBuffer, 'example.png', {});

  // upload file
  // await s3Provider.upload(fileBuffer, 'example3.png', {ContentType: 'image/png'} );
  // donwload file
  // await s3Provider.download("example1.png", {})
  // delete object
  // await s3Provider.delete('example.png',{})
  // list objects
  // await s3Provider.list({MaxKeys:5, ContinuationToken: '1b4ViI+EYgDvXxdaK30ya/sI81DnWHqe4pBcOXa8pNjWLMCw2wiSqcK6bqEH3vefogpbpYtsCYrjMRUtI7VvQ7jWA2iEMZTkttlr2/OZv0Ok='})
  // get single object
  // s3Provider.getUrl('example1.png', {expiresIn: 60 * 1})
})();