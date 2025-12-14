import { VisualMediaType } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { uploadObject } from '@/lib/s3/uploadObject';

/**
 * Save multiple post files.
 * - Blob → upload to S3
 * - string → already uploaded URL
 */
export async function savePostFiles(files: (Blob | string)[]) {
  const uploadPromises: Promise<{
    type: VisualMediaType;
    fileName: string;
  }>[] = files.map(async (file) => {
    // Case 1: URL
    if (typeof file === 'string') {
      const fileName = file.split('/').pop()!;

      const type = /\.(jpg|jpeg|png)$/i.test(fileName) ? VisualMediaType.PHOTO : VisualMediaType.VIDEO;

      return { type, fileName };
    }

    // Case 2: Blob upload
    const type = file.type.startsWith('image/') ? VisualMediaType.PHOTO : VisualMediaType.VIDEO;

    const fileExtension = file.type.split('/')[1];
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${uuid()}.${fileExtension}`;

    await uploadObject(buffer, fileName, fileExtension);

    return { type, fileName };
  });

  return Promise.all(uploadPromises);
}
