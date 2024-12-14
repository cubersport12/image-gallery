'use client';
import {useEffect, useState} from 'react';
import {ImageVm} from '@/lib/types';
import {fetchImagesIds, findImage} from '@/lib/db/files';
import Image from 'next/image';
import {convertImageDtoToVm} from '@/lib/images';
import {Button} from '@/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {redirect, RedirectType} from 'next/navigation';

const CarouselImage = ({ id }: { id: string }) => {
  const [image, setImage] = useState<ImageVm | null>(null);
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const load = async () => {
      const i = await findImage(id);
      const ids = await fetchImagesIds();
      console.info('fetch------>', i, ids);
      setImage(convertImageDtoToVm(i));
      setIds(ids);
    };
    void load();
  }, [id]);

  const getId = (d: 1 | -1) => {
    const index  = ids.indexOf(String(image?.id));
    if (index > -1) {
      let nextIndex= index + d;
      if (nextIndex < 0) {
        nextIndex = ids.length -1;
      }
      if (nextIndex > ids.length) {
        nextIndex = 0;
      }
      return ids[nextIndex];
    }
    return null;
  };

  const handleLeft = () => {
    const id = getId(-1);
    if (id != null) {
      redirect(`/carousel/${id}`, RedirectType.push);
    }
  };
  const handleRight = () => {
    const id = getId(1);
    if (id != null) {
      redirect(`/carousel/${id}`);
    }
  };
  return image && <div className="h-full flex gap-1 items-center justify-center">
    <Button onClick={handleLeft}>
      <ChevronLeft />
    </Button>
    <Image src={image.src!} width={500} height={500} className="w-auto bg-no-repeat h-full bg-contain" alt={image.fileName!} />
    <Button onClick={handleRight}>
      <ChevronRight />
    </Button>
  </div>;
};

export default CarouselImage;
