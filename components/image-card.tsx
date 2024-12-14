import {ImageVm} from '@/lib/types';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Trash} from 'lucide-react';
import {redirect} from 'next/navigation';

//<Image width={150} height={150} alt={image.fileName!} src={image.src!} />

const ImageCard = ({ image, onDelete }: { image: ImageVm; onDelete: ()=> void }) => {
  const handleClick = () => {
    redirect(`/carousel/${image.id}`);
  };
  return <div className="w-60 h-60 cursor-pointer flex flex-col border rounded relative border-neutral-200 group">
    <Button onClick={onDelete} className="group-hover:visible absolute invisible right-1 top-1">
      <Trash />
    </Button>
    <Image onClick={handleClick} width="200" height="200" className="w-full h-48" alt={image.fileName!} src={image.src!} />
    <div className="grow flex items-center justify-center w-full">
      {image.fileName}
    </div>
  </div>;
};

export default ImageCard;
