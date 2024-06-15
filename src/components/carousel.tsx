import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
  images: string[];
}

export function CarouselComponent(props: CarouselProps) {
  return (
    <Carousel
      className="w-4/5 sm:w-4/5 max-w-lg flex"
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {props.images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center flex-col">
            <img src={image} alt="Camiseta CaliPet" className="rounded" />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hover:bg-zinc-200 left-2 sm:-left-12 bg-transparent border-none sm:bg-zinc-100" />
      <CarouselNext className="hover:bg-zinc-200 right-2 sm:-right-12 bg-transparent border-none sm:bg-zinc-100" />
    </Carousel>
  );
}
