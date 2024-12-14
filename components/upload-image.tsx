'use client';

import {Button} from '@/components/ui/button';
import {Upload} from 'lucide-react';
import {ChangeEvent, useRef} from 'react';
import {uploadImages} from '@/lib/db/files';
import {ImageDto} from '@/lib/types';

const UploadImage = ({ onUploaded }: { onUploaded: (images: ImageDto[]) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files != null) {
      const newImages = await uploadImages(files);
      inputRef!.current!.value = '';
      onUploaded(newImages);
    }
  };
  return <>
    <input onChange={handleInputChange} hidden aria-hidden={true} type="file" ref={inputRef} accept="image/*" />
    <Button variant="outline" onClick={() => inputRef?.current?.click()}>
      <Upload />
      Загрузить изображение...
    </Button>
  </>;
};

export default UploadImage;
