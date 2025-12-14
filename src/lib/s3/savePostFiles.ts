import { Blob as NodeBlob } from 'buffer';
import { VisualMediaType } from '@prisma/client';
import { uploadObject } from '@/lib/s3/uploadObject';
import { v4 as uuid } from 'uuid';

export async function savePostFiles(files: (string | NodeBlob)[]) {
  const uploadPromises: Promise<{ type: VisualMediaType; fileName: string }>[] = files.map(async (file) => {
    if (typeof file === 'string') {
      const fileName = file.split('/').pop()!;
      const type: VisualMediaType = /\.(jpg|jpeg|png)$/i.test(fileName) ? 'PHOTO' : 'VIDEO';
      return { type, fileName };
    }

    // NodeBlob compatible
    const type: VisualMediaType = file.type.startsWith('image/') ? 'PHOTO' : 'VIDEO';
    const fileExtension = file.type.split('/')[1];
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${uuid()}.${fileExtension}`;
    await uploadObject(buffer, fileName, fileExtension);

    return { type, fileName };
  });

  return Promise.all(uploadPromises);
}
