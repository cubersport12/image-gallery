'use server';
import {db, files} from '@/schema';
import {auth} from '@/auth';
import {findUserByEmail} from '@/lib/db/users';
import {eq} from 'drizzle-orm';
import {ImageDto} from '@/lib/types';
import {getFromRedis, setToRedis} from '@/lib/redisClient';

export const fetchImagesIds = async (): Promise<string[]> => {
  const images = await fetchImages();
  return images?.map(x => x.id!);
};

const _getRedisKey = async () => {
  const s=  await auth();
  return `IMAGES_${s?.user.email}`;
};

const _updateImagesInRedis = async (append: ImageDto[], remove: ImageDto[]) => {
  const key = await _getRedisKey();
  const images = await getFromRedis(key) as ImageDto[] | null;
  if (images != null) {
    let toSet = [...images];
    if (append.length > 0) {
      toSet = [...toSet, ...append];
    }
    if (remove.length > 0) {
      toSet = toSet.filter(x => !remove.some(y => y.id === x.id));
    }
    await setToRedis(key, toSet);
  }
};

export const fetchImages = async (): Promise<ImageDto[]> => {
  const session=  await auth();
  const user = await findUserByEmail(String(session?.user.email));
  const key = await _getRedisKey();
  const fromRedis = await getFromRedis(key);
  if (fromRedis != null) {
    return fromRedis;
  }
  const data = await db.select().from(files)
    .where(eq(files.userId, user.id));
  await _updateImagesInRedis(data as ImageDto[], []);
  return data?.map(x => ({
    ...x as ImageDto
  }));
};

export const findImage = async (id: string): Promise<ImageDto> => {
  const key = `IMAGE_${id}`;
  const fromRedis = await getFromRedis(key);
  if (fromRedis != null) {
    return fromRedis;
  }
  const r = await db.select().from(files)
    .where(eq(files.id, id))
    .limit(1);
  if (r == null) {
    throw new Error();
  }
  const result=  r[0] as ImageDto;
  await setToRedis(key, result);
  return result;

};

export const deleteImage = async (imageId: string): Promise<void> => {
  await db.delete(files)
    .where(eq(files.id, imageId));
  await _updateImagesInRedis([], [{ id: imageId }]);
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
  await _updateImagesInRedis(toInsert, []);
  return [...toInsert];
};
