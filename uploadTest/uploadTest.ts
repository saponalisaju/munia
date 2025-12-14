import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// S3 Client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFile() {
  const filePath = './uploadTest/sample.txt';
  const fileContent = fs.readFileSync(filePath);

  const fileName = `sample-${Date.now()}.txt`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: fileContent,
    ContentType: 'text/plain',
  });

  try {
    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    console.log('File uploaded successfully:', fileUrl);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

uploadFile();
