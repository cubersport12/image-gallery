'use client';
import {useEffect, useState} from 'react';
import {deleteImage, fetchImages} from '@/lib/db/files';
import {ImageDto, ImageVm} from '@/lib/types';
import ImageCard from '@/components/image-card';
import UploadImage from '@/components/upload-image';
import {convertImageDtoToVm} from '@/lib/images';



const ImagesGallery = () => {
  const [images, setImages] = useState<ImageVm[]>([]);

  const handleOnUploaded = (newImages: ImageDto[]) => {
    setImages([
      ...images,
      ...newImages.map(x => convertImageDtoToVm(x))
    ]);
  };
  const handleDelete = async (image: ImageVm) => {
    const confirmed = confirm(`Действительно удалить "${image.fileName}"?`);
    if (!confirmed) {
      return;
    }
    await deleteImage(image.id!);
    setImages(images.filter(x => x.id !== image.id));
  };
  useEffect(() => {
    const load = async () => {
      const data = await fetchImages();
      setImages(data.map(x => convertImageDtoToVm(x)));
    };
    void load();
  }, []);
  return <div className="flex flex-col w-full h-full gap-1 overflow-hidden pos p-1">
    <div className="flex gap-1">
      <UploadImage onUploaded={handleOnUploaded}/>
    </div>
    <div className="flex flex-wrap gap-1">

      {
        images.map((image, index) => <ImageCard onDelete={() => handleDelete(image)} key={index} image={image}/>)
      }
    </div>
  </div>;
};

export default ImagesGallery;
