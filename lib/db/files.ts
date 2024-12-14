'use server';
import {db, files} from '@/schema';
import {auth} from '@/auth';
import {findUserByEmail} from '@/lib/db/users';
import {eq} from 'drizzle-orm';
import {ImageDto} from '@/lib/types';

export const fetchImagesIds = async (): Promise<string[]> => {
  const session=  await auth();
  const user = await findUserByEmail(String(session?.user.email));
  const r =await db.select({ id: files.id })
    .from(files)
    .where(eq(files.userId, String(user.id)));
  return r?.map(x => x.id);
};

export const fetchPreviewImages = async (): Promise<ImageDto[]> => {
  const session=  await auth();
  const user = await findUserByEmail(String(session?.user.email));
  const data = await db.select().from(files)
    .where(eq(files.userId, user.id));
  return data?.map(x => ({
    ...x as ImageDto
  }));
};

export const findImage = async (id: string): Promise<ImageDto> => {
  const r = await db.select().from(files)
    .where(eq(files.id, id))
    .limit(1);
  if (r == null) {
    throw new Error();
  }
  return r[0] as ImageDto;

};

export const deleteImage = async (imageId: string): Promise<void> => {
  await db.delete(files)
    .where(eq(files.id, imageId));
};

export const uploadImages = async (fileList: FileList) => {
  const array = Array.from(fileList);
  const session=  await auth();
  const user = await findUserByEmail(String(session?.user.email));
  const toInsert: ImageDto[] = [];
  for (let i = 0; i < array.length; i++) {
    const file = array[i];
    const buffer= await file.arrayBuffer();
    const text = Buffer.from(buffer).toString('base64');
    toInsert.push({
      userId: String(user.id),
      timestamp: new Date(),
      fileName: file.name,
      mimeType: file.type,
      file: text
    });
  }
  await db.insert(files).values(toInsert);
  return [...toInsert];
};
