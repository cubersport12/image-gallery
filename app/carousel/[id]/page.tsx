import CarouselImage from '@/components/carousel';

const CarouselPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  return <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
    <CarouselImage id={p.id} />
  </div>;
};

export default CarouselPage;
