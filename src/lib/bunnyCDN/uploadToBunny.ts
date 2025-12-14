import ftp from 'basic-ftp';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

export async function bunnyUploadBuffer(buffer: Buffer, remoteFileName: string) {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.BUNNY_STORAGE_HOST!,
      user: process.env.BUNNY_STORAGE_USERNAME!,
      password: process.env.BUNNY_STORAGE_PASSWORD!,
      secure: false,
    });

    // Convert Buffer to Readable stream
    const readableStream = Readable.from(buffer);

    await client.uploadFrom(readableStream, remoteFileName);
    console.log(`Uploaded ${remoteFileName} to BunnyCDN`);
  } catch (err) {
    console.error('BunnyCDN upload failed:', err);
    throw err;
  } finally {
    client.close();
  }
}
