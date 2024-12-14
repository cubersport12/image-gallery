import {ImageDto} from '@/lib/types';
import {b64toObjectURL} from '@/lib/blob';

export const convertImageDtoToVm = (dto: ImageDto) => ({
  fileName: dto.fileName,
  timestamp: dto.timestamp,
  mimeType: dto.mimeType,
  id: dto.id,
  src: b64toObjectURL(String(dto.file), String(dto.mimeType))
});
