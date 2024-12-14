export type NullableValue<T> = T | null | undefined;

export interface ImageDto {
  id?: string;
  userId?: string;
  fileName?: string;
  mimeType?: string;
  file?: string;
  timestamp?: Date
}

export interface ImageVm extends Omit<ImageDto, 'userId' | 'file'> {
  src?: string
}
